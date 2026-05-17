"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { TextLink } from "./TextLink";

export type HoverRowItem = {
  index: string;
  title?: string;
  body?: React.ReactNode;
  href?: string;
  mediaFolder: string;
  description: string;
  byline?: string;
  scrambleTitle?: boolean;
  variant?: "project" | "entry";
};

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
    ) : null;

  return (
    <article
      className={`hover-row${isProject ? " hover-row-project" : ""}${
        isActive ? " active" : ""
      }`}
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
