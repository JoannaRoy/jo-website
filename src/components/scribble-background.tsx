import type { CSSProperties } from "react";

type ScribbleBackgroundProps = {
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
  strokeColors?: string[];
  opacity?: number;
};

export function ScribbleBackground({
  className = "",
  style,
  strokeWidth = 22,
  strokeColors,
  opacity = 1,
}: ScribbleBackgroundProps) {
  const defaultStrokeColors = ["#6d5cf6", "#d7255f", "#0b8896"];
  const getStrokeColor = (idx: number) =>
    strokeColors?.[idx] ?? defaultStrokeColors[idx] ?? defaultStrokeColors[0];

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M-50 250 C 140 320, 360 320, 560 300 C 720 285, 820 260, 910 220 C 960 198, 995 190, 1030 210 C 1080 240, 1070 320, 1010 360 C 950 400, 860 410, 800 370 C 740 330, 745 280, 790 245"
        fill="none"
        stroke={getStrokeColor(0)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.75 * opacity}
      />

      <path
        d="M-80 630 C 160 610, 280 640, 420 720 C 520 778, 520 860, 450 900 C 380 940, 300 920, 270 840 C 240 760, 300 700, 380 680 C 560 640, 720 560, 900 460 C 980 415, 1040 395, 1120 380"
        fill="none"
        stroke={getStrokeColor(1)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.75 * opacity}
      />

      <path
        d="M-120 920 C 120 900, 240 880, 360 900 C 480 920, 560 980, 700 990 C 840 1000, 940 930, 1040 820"
        fill="none"
        stroke={getStrokeColor(2)}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.8 * opacity}
      />
    </svg>
  );
}
