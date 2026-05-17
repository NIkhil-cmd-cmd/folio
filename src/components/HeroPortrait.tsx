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
        gridSize={3}
        threshold={0.48}
        contrast={1.1}
        objectFit="cover"
        className="hero-portrait-dither"
        backgroundColor="transparent"
      />
    </div>
  );
}
