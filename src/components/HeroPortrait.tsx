"use client";

import DitherShader from "@/components/ui/dither-shader";
import { MEDIA } from "@/lib/media";

export function HeroPortrait() {
  return (
    <div className="hero-portrait-wrap animate-hero-subtitle">
      <DitherShader
        src={MEDIA.profile}
        ditherMode="halftone"
        colorMode="duotone"
        primaryColor="#C41E3A"
        secondaryColor="#C41E3A"
        gridSize={1}
        pixelRatio={1}
        halftoneScale={0.35}
        pixelatedRendering={false}
        removeBackground="chroma-green"
        chromaStrength={0.5}
        threshold={0.42}
        contrast={1.08}
        brightness={0.03}
        objectFit="cover"
        className="hero-portrait-dither"
        backgroundColor="transparent"
      />
    </div>
  );
}
