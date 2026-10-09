"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import type { PaperShaderElement } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

export function Shader() {
  const ref = useRef<PaperShaderElement>(null);

  // the pointer nudges the grain a little; uniforms are set directly so React never re-renders
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      el.paperShaderMount?.setSpeed(0);
    const target = { x: 0, y: 0 };
    const at = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      at.x += (target.x - at.x) * 0.05;
      at.y += (target.y - at.y) * 0.05;
      el.paperShaderMount?.setUniforms({ u_offsetX: at.x, u_offsetY: at.y });
      if (Math.abs(target.x - at.x) + Math.abs(target.y - at.y) > 1e-4)
        raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = ((e.clientX / innerWidth) * 2 - 1) * 0.04;
      target.y = (1 - (e.clientY / innerHeight) * 2) * 0.04;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <GrainGradient
      ref={ref}
      className="bg"
      colorBack="#0e0d10"
      colors={["#1e1c23", "#0e0d10"]}
      shape="wave"
      softness={1}
      intensity={0.3}
      noise={0.85}
      scale={1.2}
      speed={0.25}
      minPixelRatio={1}
    />
  );
}
