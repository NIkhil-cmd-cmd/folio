"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { TextLink } from "./TextLink";

export type HoverRowItem = {
  /** Stable key for hover state (defaults to mediaFolder). */
  id?: string;
  index: string;
  title?: string;
  body?: React.ReactNode;
  href?: string;
  /** When set, hover preview embeds this URL in an iframe (defaults to href). */
  previewUrl?: string;
  /** Scrollable PDF in the hover panel. */
  previewPdf?: string;
  mediaFolder: string;
  description: string;
  byline?: string;
  scrambleTitle?: boolean;
  variant?: "project" | "entry" | "press";
  /** Device mockup for app screen recordings. */
  previewDevice?: "iphone" | "mac" | "default";
  /** Scale video/image to fit without cropping (no device frame). */
  previewFit?: "cover" | "contain";
};

export function hoverRowId(item: HoverRowItem): string {
  return item.id ?? item.mediaFolder;
}

type MediaHoverRowProps = {
  item: HoverRowItem;
  reduceMotion?: boolean;
  isActive?: boolean;
  onActivate?: (item: HoverRowItem) => void;
  onDeactivate?: () => void;
};

export function MediaHoverRow({
  item,
  reduceMotion = false,
  isActive = false,
  onActivate,
  onDeactivate,
}: MediaHoverRowProps) {
  const [isMobile, setIsMobile] = useState(false);

  const isProject = item.variant === "project" && item.title;
  const isPress = item.variant === "press" && item.title;

  const { ref, replay } = useScramble({
    ...SCRAMBLE_CONFIG,
    text: item.title ?? "",
    playOnMount: false,
    speed: reduceMotion ? 0 : SCRAMBLE_CONFIG.speed,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 900px)").matches);
  }, []);

  const handleRowEnter = () => {
    if (!isMobile) onActivate?.(item);
    if (!reduceMotion && item.scrambleTitle && item.title) replay();
  };

  const handleRowLeave = () => {
    if (!isMobile) onDeactivate?.();
  };

  const handleRowClick = () => {
    if (isMobile) {
      if (isActive) onDeactivate?.();
      else onActivate?.(item);
      if (!reduceMotion && item.scrambleTitle && item.title) replay();
    }
  };

  const titleContent =
    isProject && item.title ? (
      <h3 className="project-title">
        {item.href ? (
          <TextLink href={item.href} external className="project-title-link">
            <span ref={ref} className="project-title-text">
              {item.title}
            </span>
          </TextLink>
        ) : (
          <span ref={ref} className="project-title-text">
            {item.title}
          </span>
        )}
      </h3>
    ) : isPress && item.title ? (
      <h3 className="press-title">
        {item.href ? (
          <TextLink href={item.href} external className="press-title-link">
            {item.title}
          </TextLink>
        ) : (
          item.title
        )}
      </h3>
    ) : null;

  return (
    <article
      className={`hover-row${isProject ? " hover-row-project" : ""}${
        isPress ? " hover-row-press" : ""
      }${isActive ? " active" : ""}`}
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      onClick={handleRowClick}
    >
      <span className="item-index">{item.index}</span>
      <div className="hover-row-body">
        {titleContent}
        {item.body ? (
          <div className="item-content entry-body">{item.body}</div>
        ) : null}
      </div>
    </article>
  );
}
