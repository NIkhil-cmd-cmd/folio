"use client";

import { faviconUrl, siteHostname } from "@/lib/embed";

type LinkPreviewProps = {
  href: string;
  title: string;
  coverSrc?: string;
};

export function LinkPreview({ href, title, coverSrc }: LinkPreviewProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-preview"
    >
      {coverSrc ? (
        <img src={coverSrc} alt="" className="link-preview-cover" />
      ) : (
        <div className="link-preview-cover link-preview-cover--empty" />
      )}
      <div className="link-preview-meta">
        <img
          src={faviconUrl(href)}
          alt=""
          width={28}
          height={28}
          className="link-preview-favicon"
        />
        <div className="link-preview-text">
          <span className="link-preview-host">{siteHostname(href)}</span>
          <span className="link-preview-title">{title}</span>
        </div>
        <span className="link-preview-cta">visit ↗</span>
      </div>
    </a>
  );
}
