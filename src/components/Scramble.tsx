"use client";

import { createElement } from "react";
import { useScramble } from "use-scramble";

// the settings tinabmai.com runs: decode on mount; links also replay on hover
const SETTINGS = { speed: 0.8, tick: 1, step: 2.3, scramble: 10, chance: 0.8, overdrive: false };

export function Scramble({
  text,
  as = "span",
  className,
  hover = false,
}: {
  text: string;
  as?: "span" | "p" | "h2";
  className?: string;
  hover?: boolean;
}) {
  const { ref, replay } = useScramble({ text, ...SETTINGS });
  return createElement(as, {
    ref,
    className,
    ...(hover ? { onMouseOver: replay, onFocus: replay } : {}),
  });
}
