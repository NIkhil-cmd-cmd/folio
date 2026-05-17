"use client";

import { useCallback, useEffect, useState } from "react";
import DitherShader from "@/components/ui/dither-shader";
import { MEDIA } from "@/lib/media";

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  skipLight: boolean;
};

function colorsForTheme(theme: string | null): ThemeColors {
  if (theme === "dark") {
    return {
      primary: "#f5f4f0",
      secondary: "#d8d6d1",
      accent: "#E8364F",
      skipLight: false,
    };
  }
  return {
    primary: "#C41E3A",
    secondary: "#C41E3A",
    accent: "#C41E3A",
    skipLight: true,
  };
}

export function HeroPortrait() {
  const [colors, setColors] = useState<ThemeColors>(() =>
    colorsForTheme(null)
  );
  const [mouse, setMouse] = useState({ x: -1, y: -1, active: false });

  useEffect(() => {
    const sync = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setColors(colorsForTheme(theme));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setMouse({ x: -1, y: -1, active: false });
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      active: true,
    });
  }, []);

  return (
    <div
      className="hero-portrait-wrap animate-hero-subtitle interactive-portrait"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      role="img"
      aria-label="Portrait of Nikhil Krishnaswamy — move cursor to interact with halftone particles"
    >
      <DitherShader
        src={MEDIA.profile}
        ditherMode="halftone"
        colorMode="duotone"
        primaryColor={colors.primary}
        secondaryColor={colors.secondary}
        interactColor={colors.accent}
        gridSize={1}
        pixelRatio={1}
        halftoneScale={0.35}
        pixelatedRendering={false}
        removeBackground="chroma-green"
        chromaStrength={0.78}
        skipLightHalftone={colors.skipLight}
        threshold={0.42}
        contrast={1.08}
        brightness={0.03}
        objectFit="cover"
        className="hero-portrait-dither"
        backgroundColor="transparent"
        mouse={mouse}
        interactRadius={110}
      />
    </div>
  );
}
