"use client";

type DesktopPreviewProps = {
  videoSrc?: string;
  imageSrc?: string;
  label?: string;
};

export function DesktopPreview({
  videoSrc,
  imageSrc,
  label = "app",
}: DesktopPreviewProps) {
  return (
    <div className="desktop-preview">
      <div className="desktop-preview-bar" aria-hidden>
        <span className="desktop-preview-dot" />
        <span className="desktop-preview-dot" />
        <span className="desktop-preview-dot" />
        <span className="desktop-preview-label">{label}</span>
      </div>
      <div className="desktop-preview-screen">
        {videoSrc ? (
          <video
            src={videoSrc}
            className="desktop-preview-media"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : imageSrc ? (
          <img src={imageSrc} alt="" className="desktop-preview-media" />
        ) : (
          <div className="desktop-preview-empty" />
        )}
      </div>
    </div>
  );
}
