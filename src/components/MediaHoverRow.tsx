"use client";

import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";
import { MEDIA } from "@/lib/media";
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
};

export function MediaHoverRow({ item, reduceMotion = false }: MediaHoverRowProps) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imgSrc, setImgSrc] = useState(`${item.mediaFolder}/cover.jpg`);
  const [useVideo, setUseVideo] = useState(false);

  const isProject = item.variant === "project" && item.title;

  const { ref, replay } = useScramble({
    ...SCRAMBLE_CONFIG,
    text: item.title ?? "",
    playOnMount: false,
    speed: reduceMotion ? 0 : SCRAMBLE_CONFIG.speed,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  useEffect(() => {
    setImgSrc(`${item.mediaFolder}/cover.jpg`);
    setUseVideo(false);

    fetch(`${item.mediaFolder}/preview.mp4`, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setUseVideo(true);
      })
      .catch(() => {});
  }, [item.mediaFolder]);

  const handleRowEnter = () => {
    if (!isMobile) setActive(true);
    if (!reduceMotion && item.scrambleTitle && item.title) replay();
  };

  const handleRowLeave = () => {
    if (!isMobile) setActive(false);
  };

  const handleRowClick = () => {
    if (isMobile) {
      setActive((v) => !v);
      if (!reduceMotion && item.scrambleTitle && item.title) replay();
    }
  };

  const handleImgError = () => {
    const png = `${item.mediaFolder}/cover.png`;
    if (imgSrc.endsWith("cover.jpg")) {
      setImgSrc(png);
      return;
    }
    setImgSrc(MEDIA.placeholder);
  };

  const mediaBlock = useVideo ? (
    <video
      src={`${item.mediaFolder}/preview.mp4`}
      className="hover-card-media"
      autoPlay
      muted
      loop
      playsInline
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt=""
      className="hover-card-media"
      onError={handleImgError}
    />
  );

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
        active ? " active" : ""
      }`}
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      onClick={handleRowClick}
    >
      <span className="item-index">{item.index}</span>
      <div className="hover-row-body">
        {titleContent}
        {item.body && <div className="item-content entry-body">{item.body}</div>}
        <div className="hover-card-wrapper">
          <div className="hover-card" role="tooltip">
            {mediaBlock}
            <div className="hover-card-text">
              {item.byline && (
                <p className="hover-card-byline">{item.byline}</p>
              )}
              <p className="hover-card-desc">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
