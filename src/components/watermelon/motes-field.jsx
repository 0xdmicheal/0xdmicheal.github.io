import { Motes } from "@lucasmarkes/motes-react";

// Pointer-reactive ASCII field (motes by Lucas Markes, MIT), tuned to the site's paper and ink.
const TONES = {
  paper: { ink: "#b9ae9c", accent: "#141311", contrast: 1.15, brightness: -0.12 },
  dark: { ink: "#2f2b26", accent: "#8a8175", contrast: 1.2, brightness: -0.18 },
};

export function MotesField({ tone = "paper", effect = "flow", className = "" }) {
  const t = TONES[tone];
  return (
    <Motes
      effect={effect}
      pointer={false}
      radius={160}
      force={1.3}
      speed={0.7}
      density={13}
      background="transparent"
      ink={t.ink}
      accent={t.accent}
      contrast={t.contrast}
      brightness={t.brightness}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
