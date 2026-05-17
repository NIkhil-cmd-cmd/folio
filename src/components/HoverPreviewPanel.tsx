"use client";

import { useEffect, useState } from "react";
import type { HoverRowItem } from "./MediaHoverRow";
import { MEDIA } from "@/lib/media";

type HoverPreviewPanelProps = {
  item: HoverRowItem | null;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

export function HoverPreviewPanel({
  item,
  onPointerEnter,
  onPointerLeave,
}: HoverPreviewPanelProps) {
  const [imgSrc, setImgSrc] = useState<string>(MEDIA.placeholder);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (!item) return;

    setImgSrc(`${item.mediaFolder}/cover.jpg`);
    setUseVideo(false);

    fetch(`${item.mediaFolder}/preview.mp4`, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setUseVideo(true);
      })
      .catch(() => {});
  }, [item]);

  const handleImgError = () => {
    if (!item) return;
    if (imgSrc.endsWith("cover.jpg")) {
      setImgSrc(`${item.mediaFolder}/cover.png`);
      return;
    }
    setImgSrc(MEDIA.placeholder);
  };

  return (
    <aside
      className={`hover-preview-panel${item ? " is-visible" : ""}`}
      aria-live="polite"
      aria-hidden={!item}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <div className="hover-card" key={item?.mediaFolder ?? "empty"}>
        {item ? (
          <>
            {useVideo ? (
              <video
                src={`${item.mediaFolder}/preview.mp4`}
                className="hover-card-media"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={imgSrc}
                alt=""
                className="hover-card-media"
                onError={handleImgError}
              />
            )}
            <div className="hover-card-text">
              {item.title ? (
                <p className="hover-card-title">{item.title}</p>
              ) : null}
              {item.byline ? (
                <p className="hover-card-byline">{item.byline}</p>
              ) : null}
              <p className="hover-card-desc">{item.description}</p>
            </div>
          </>
        ) : null}
      </div>
    </aside>
  );
}
