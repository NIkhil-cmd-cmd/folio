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
  const imageSrc = imgSrc !== MEDIA.placeholder ? imgSrc : undefined;
  const hasVideo = Boolean(videoSrc);
  const hasImage = Boolean(imageSrc);
  const hasPdf = Boolean(item.previewPdf);
  const embedSrc = link && isEmbeddableUrl(link) ? link : undefined;
  const showLinkCard = Boolean(link && !embedSrc);
  const isDeviceMock =
    item.previewDevice === "iphone" || item.previewDevice === "mac";
  const isFitPreview = item.previewFit === "contain";
  const isProject = item.variant === "project";

  let media: ReactNode = null;
  let mediaKind: "device" | "iframe" | "pdf" | "link" | "fill" | null = null;

  if (hasPdf) {
    mediaKind = "pdf";
    media = (
      <object
        data={item.previewPdf}
        type="application/pdf"
        className="preview-pdf"
        aria-label={`${label} PDF`}
      />
    );
  } else if (hasVideo) {
    mediaKind = "device";
    if (item.previewDevice === "iphone") {
      media = (
        <PhonePreview videoSrc={videoSrc ?? undefined} imageSrc={undefined} />
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
      mediaKind = "fill";
      media = (
        <video
          src={videoSrc!}
          className={`preview-fill-media${isFitPreview ? " preview-fill-media--contain" : ""}`}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }
  } else if (embedSrc) {
    mediaKind = "iframe";
    media = <ScrollingIframe src={embedSrc} title={label} playing />;
  } else if (hasImage) {
    if (item.previewDevice === "iphone") {
      mediaKind = "device";
      media = <PhonePreview imageSrc={imageSrc} />;
    } else if (item.previewDevice === "mac") {
      mediaKind = "device";
      media = (
        <DesktopPreview imageSrc={imageSrc} label={item.title ?? "app"} />
      );
    } else {
      mediaKind = "fill";
      media = (
        <img
          src={imageSrc}
          alt=""
          className={`preview-fill-media${isFitPreview ? " preview-fill-media--contain" : ""}`}
        />
      );
    }
  } else if (showLinkCard && link) {
    mediaKind = "link";
    media = (
      <LinkPreview href={link} title={label} coverSrc={imageSrc} />
    );
  } else if (isDeviceMock) {
    mediaKind = "device";
    media =
      item.previewDevice === "mac" ? (
        <DesktopPreview label={item.title ?? "app"} />
      ) : (
        <PhonePreview />
      );
  }

  const hasMedia = Boolean(media);
  const showVisit =
    Boolean(link) &&
    !showLinkCard &&
    (hasPdf || mediaKind === "iframe" || mediaKind === "device" || hasVideo || hasImage);
  const showDesc =
    !isDeviceMock &&
    mediaKind !== "iframe" &&
    mediaKind !== "link" &&
    !item.body &&
    Boolean(item.description);
  const showFooter = Boolean(isProject && item.title) || showDesc || showVisit;

  if (!hasMedia && !showFooter) {
    return <aside className="preview-panel" aria-hidden aria-live="polite" />;
  }

  const cardClass = [
    "preview-card",
    mediaKind === "device" ? "preview-card--device" : "",
    mediaKind === "iframe" ? "preview-card--iframe" : "",
    mediaKind === "link" ? "preview-card--link" : "",
    isFitPreview ? "preview-card--contain" : "",
    !showFooter ? "preview-card--media-only" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      className="preview-panel preview-panel--visible"
      aria-live="polite"
      onMouseEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className={cardClass} key={item.id ?? item.mediaFolder}>
        {hasMedia ? (
          <div
            className={[
              "preview-card-media",
              loading ? "preview-card-media--loading" : "",
              isFitPreview ? "preview-card-media--contain" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {media}
          </div>
        ) : null}
        {showFooter ? (
          <div className="preview-card-footer">
            {isProject && item.title ? (
              <span className="preview-card-label">{item.title}</span>
            ) : null}
            {showDesc ? (
              <p className="preview-card-desc">{item.description}</p>
            ) : null}
            {showVisit && link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-card-link"
              >
                visit ↗
              </a>
            ) : null}
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
          </div>
        ) : null}
      </div>
    </aside>
  );
}
