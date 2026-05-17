"use client";

import { useId } from "react";
import { Iphone17Pro } from "@/components/ui/iphone-17-pro";

type PhonePreviewProps = {
  videoSrc?: string;
  imageSrc?: string;
};

export function PhonePreview({ videoSrc, imageSrc }: PhonePreviewProps) {
  const clipId = useId().replace(/:/g, "");

  return (
    <div className="phone-preview">
      <div className="phone-preview-screen">
        {videoSrc ? (
          <video
            src={videoSrc}
            className="phone-preview-media"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : imageSrc ? (
          <img src={imageSrc} alt="" className="phone-preview-media" />
        ) : (
          <div className="phone-preview-empty" />
        )}
      </div>
      <Iphone17Pro
        width={200}
        height={400}
        clipPathId={clipId}
        screenOverlay
        className="phone-preview-frame"
        aria-hidden
      />
    </div>
  );
}
