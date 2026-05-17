"use client";

import { useEffect, useState } from "react";
import type { HoverRowItem } from "./MediaHoverRow";
import { MEDIA } from "@/lib/media";
import { ScrollingIframe } from "./ScrollingIframe";

type HoverPreviewPanelProps = {
  item: HoverRowItem | null;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

function getEmbedUrl(item: HoverRowItem): string | undefined {
  return item.previewUrl ?? item.href;
}

export function HoverPreviewPanel({
  item,
  onPointerEnter,
  onPointerLeave,
}: HoverPreviewPanelProps) {
  const [imgSrc, setImgSrc] = useState<string>(MEDIA.placeholder);
  const [useVideo, setUseVideo] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const embedUrl = item ? getEmbedUrl(item) : undefined;
  const showIframe = Boolean(embedUrl) && !iframeFailed;

  useEffect(() => {
    if (!item) return;

    setIframeFailed(false);
    setImgSrc(`${item.mediaFolder}/cover.jpg`);
    setUseVideo(false);

    if (embedUrl) return;

    fetch(`${item.mediaFolder}/preview.mp4`, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setUseVideo(true);
      })
      .catch(() => {});
  }, [item, embedUrl]);

  const handleImgError = () => {
    if (!item) return;
    if (imgSrc.endsWith("cover.jpg")) {
      setImgSrc(`${item.mediaFolder}/cover.png`);
      return;
    }
    setImgSrc(MEDIA.placeholder);
  };

  const previewLabel =
    item?.title ?? item?.description.slice(0, 48) ?? "Preview";

  const mediaContent = showIframe ? (
    <ScrollingIframe
      src={embedUrl!}
      title={`${previewLabel} preview`}
      playing={showIframe}
    />
  ) : useVideo && item ? (
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
  );

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
            <div className="hover-card-media-wrap">{mediaContent}</div>
            <div className="hover-card-text">
              {item.title ? (
                <p className="hover-card-title">{item.title}</p>
              ) : null}
              {item.byline ? (
                <p className="hover-card-byline">{item.byline}</p>
              ) : null}
              <p className="hover-card-desc">{item.description}</p>
              {embedUrl ? (
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-card-open"
                >
                  open site ↗
                </a>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </aside>
  );
}
