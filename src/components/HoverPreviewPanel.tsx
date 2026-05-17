"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { HoverRowItem } from "./MediaHoverRow";
import { DesktopPreview } from "./DesktopPreview";
import { LinkPreview } from "./LinkPreview";
import { PhonePreview } from "./PhonePreview";
import { ScrollingIframe } from "./ScrollingIframe";
import { isEmbeddableUrl } from "@/lib/embed";
import {
  coverImageCandidates,
  findFirstExistingUrl,
  MEDIA,
  previewVideoCandidates,
} from "@/lib/media";

type HoverPreviewPanelProps = {
  item: HoverRowItem | null;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

function visitUrl(item: HoverRowItem): string | undefined {
  return item.previewUrl ?? item.href;
}

function previewLabel(item: HoverRowItem): string {
  return item.title ?? item.description.slice(0, 80);
}

/** Description in the card — not duplicated by the list row body. */
function cardDescription(item: HoverRowItem): string | undefined {
  if (item.body) return undefined;
  return item.description;
}

export function HoverPreviewPanel({
  item,
  onPointerEnter,
  onPointerLeave,
}: HoverPreviewPanelProps) {
  const [imgSrc, setImgSrc] = useState<string>(MEDIA.placeholder);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!item) return;

    setLoading(true);
    setImgSrc(MEDIA.placeholder);
    setVideoSrc(null);

    let cancelled = false;

    const load = async () => {
      const cover = await findFirstExistingUrl(
        coverImageCandidates(item.mediaFolder),
      );
      if (cancelled) return;
      setImgSrc(cover ?? MEDIA.placeholder);

      if (!item.previewPdf) {
        const video = await findFirstExistingUrl(
          previewVideoCandidates(item.mediaFolder),
        );
        if (!cancelled) setVideoSrc(video);
      }
      if (!cancelled) setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [item]);

  if (!item) {
    return <aside className="preview-panel" aria-hidden aria-live="polite" />;
  }

  const link = visitUrl(item);
  const label = previewLabel(item);
  const description = cardDescription(item);
  const imageSrc = imgSrc !== MEDIA.placeholder ? imgSrc : undefined;
  const hasVideo = Boolean(videoSrc);
  const hasImage = Boolean(imageSrc);
  const hasPdf = Boolean(item.previewPdf);
  const embedSrc =
    link && isEmbeddableUrl(link) ? link : undefined;
  const showLinkCard = Boolean(link && !embedSrc);

  let media: ReactNode = null;

  if (hasPdf) {
    media = (
      <object
        data={item.previewPdf}
        type="application/pdf"
        className="preview-pdf"
        aria-label={`${label} PDF`}
      />
    );
  } else if (hasVideo) {
    if (item.previewDevice === "iphone") {
      media = (
        <PhonePreview
          videoSrc={videoSrc ?? undefined}
          imageSrc={undefined}
        />
      );
    } else if (item.previewDevice === "mac") {
      media = (
        <DesktopPreview
          videoSrc={videoSrc ?? undefined}
          imageSrc={undefined}
          label={item.title ?? "app"}
        />
      );
    } else {
      media = (
        <video
          src={videoSrc!}
          className="preview-fill-media"
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }
  } else if (embedSrc) {
    media = <ScrollingIframe src={embedSrc} title={label} playing />;
  } else if (hasImage) {
    if (item.previewDevice === "iphone") {
      media = <PhonePreview imageSrc={imageSrc} />;
    } else if (item.previewDevice === "mac") {
      media = (
        <DesktopPreview
          imageSrc={imageSrc}
          label={item.title ?? "app"}
        />
      );
    } else {
      media = <img src={imageSrc} alt="" className="preview-fill-media" />;
    }
  } else if (showLinkCard && link) {
    media = (
      <LinkPreview
        href={link}
        title={label}
        coverSrc={imageSrc}
      />
    );
  }

  const hasMedia = Boolean(media);
  const hasActions = Boolean(
    item.previewPdf ||
      (link && embedSrc) ||
      (link && (hasVideo || hasImage) && !showLinkCard),
  );
  const showBody = Boolean(description || hasActions);

  if (!hasMedia && !showBody) {
    return <aside className="preview-panel" aria-hidden aria-live="polite" />;
  }

  return (
    <aside
      className="preview-panel preview-panel--visible"
      aria-live="polite"
      onMouseEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        className={`preview-card${hasMedia ? "" : " preview-card--text"}`}
        key={item.id ?? item.mediaFolder}
      >
        {hasMedia ? (
          <div
            className={`preview-card-media${loading ? " preview-card-media--loading" : ""}`}
          >
            {media}
          </div>
        ) : null}
        {showBody ? (
          <div className="preview-card-body">
            {description ? (
              <p className="preview-card-desc">{description}</p>
            ) : null}
            {hasActions ? (
              <div className="preview-card-actions">
                {item.previewPdf ? (
                  <a
                    href={item.previewPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-card-link"
                  >
                    pdf ↗
                  </a>
                ) : null}
                {link && (embedSrc || hasVideo || hasImage) ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-card-link"
                  >
                    visit ↗
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
