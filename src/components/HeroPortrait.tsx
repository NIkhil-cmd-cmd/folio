"use client";

import { useEffect, useState } from "react";
import DitherShader from "@/components/ui/dither-shader";
import { MEDIA } from "@/lib/media";

export function HeroPortrait() {
  const [secondaryColor, setSecondaryColor] = useState("#f5f4f0");

  useEffect(() => {
    const sync = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setSecondaryColor(theme === "dark" ? "#0e0e0d" : "#f5f4f0");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-portrait-wrap animate-hero-subtitle">
      <DitherShader
        src={MEDIA.profile}
        ditherMode="halftone"
        colorMode="duotone"
        primaryColor="#C41E3A"
        secondaryColor={secondaryColor}
        gridSize={1}
        pixelRatio={1}
        halftoneScale={0.35}
        pixelatedRendering={false}
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
