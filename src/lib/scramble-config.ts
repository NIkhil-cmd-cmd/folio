import type { UseScrambleProps } from "use-scramble";

export const SCRAMBLE_CONFIG: Omit<UseScrambleProps, "text"> = {
  speed: 0.6,
  tick: 2,
  step: 1,
  scramble: 8,
  seed: 3,
  chance: 0.85,
  overdrive: false,
  overflow: true,
  playOnMount: true,
};
