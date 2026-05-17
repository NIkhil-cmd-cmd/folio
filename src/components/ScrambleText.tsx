"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScramble } from "use-scramble";
import { SCRAMBLE_CONFIG } from "@/lib/scramble-config";

type ScrambleTextProps = {
  text: string;
  className?: string;
  playOnMount?: boolean;
  triggerOnView?: boolean;
  replayOnHover?: boolean;
  disabled?: boolean;
};

export function ScrambleText({
  text,
  className,
  playOnMount = false,
  triggerOnView = false,
  replayOnHover = false,
  disabled = false,
}: ScrambleTextProps) {
  const hasPlayedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { ref: scrambleRef, replay } = useScramble({
    ...SCRAMBLE_CONFIG,
    text,
    playOnMount: disabled ? false : playOnMount,
    speed: disabled ? 0 : SCRAMBLE_CONFIG.speed,
  });

  const setRef = useCallback(
    (node: HTMLSpanElement | null) => {
      scrambleRef.current = node;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node || disabled || !triggerOnView) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            replay();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [disabled, triggerOnView, replay, scrambleRef]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (!disabled && replayOnHover) replay();
  };

  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      ref={setRef}
      className={className}
      onMouseEnter={handleMouseEnter}
    />
  );
}
