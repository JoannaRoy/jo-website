import type React from "react";

type DashFrameShape = "square" | "rounded" | "circle";

interface DashFrameProps {
  children: React.ReactNode;
  colours?: string[];
  horizontalDashCount?: number;
  verticalDashCount?: number;
  horizontalDashClassName?: string;
  verticalDashClassName?: string;
  className?: string;
  contentClassName?: string;
  shape?: DashFrameShape;
}

const SHAPE_TO_CLASSNAME: Record<DashFrameShape, string> = {
  square: "rounded-none",
  rounded: "rounded-2xl",
  circle: "rounded-full",
};

export const DashFrame: React.FC<DashFrameProps> = ({
  children,
  colours = ["bg-pink-400/60", "bg-blue-400/60", "bg-green-400/60"],
  horizontalDashCount = 12,
  verticalDashCount = 10,
  horizontalDashClassName = "w-6 h-2",
  verticalDashClassName = "w-2 h-6",
  className = "",
  contentClassName = "",
  shape = "rounded",
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const displayHorizontalDashCount = isMobile ? Math.min(horizontalDashCount, 10) : horizontalDashCount;
  const displayVerticalDashCount = isMobile ? Math.min(verticalDashCount, 8) : verticalDashCount;
  const shapeClassName = SHAPE_TO_CLASSNAME[shape];

  const Dash = ({ index, className }: { index: number; className: string }) => (
    <div
      className={`${className} ${colours[index % colours.length]} rounded-full shrink-0`}
      aria-hidden="true"
    />
  );

  return (
    <div className={`relative inline-block ${shapeClassName} ${className}`}>
      <div className={`relative z-10 ${shapeClassName} ${contentClassName}`}>{children}</div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 right-0 top-0 flex justify-between items-center">
          {Array.from({ length: displayHorizontalDashCount }).map((_, index) => (
            <Dash key={`top-${index}-${horizontalDashClassName}`} index={index} className={horizontalDashClassName} />
          ))}
        </div>

        <div className="absolute left-0 right-0 bottom-0 flex justify-between items-center">
          {Array.from({ length: displayHorizontalDashCount }).map((_, index) => (
            <Dash
              key={`bottom-${index}-${horizontalDashClassName}`}
              index={index + displayHorizontalDashCount}
              className={horizontalDashClassName}
            />
          ))}
        </div>

        <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between items-center">
          {Array.from({ length: displayVerticalDashCount }).map((_, index) => (
            <Dash
              key={`left-${index}-${verticalDashClassName}`}
              index={index + displayHorizontalDashCount * 2}
              className={verticalDashClassName}
            />
          ))}
        </div>

        <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-between items-center">
          {Array.from({ length: displayVerticalDashCount }).map((_, index) => (
            <Dash
              key={`right-${index}-${verticalDashClassName}`}
              index={index + displayHorizontalDashCount * 2 + displayVerticalDashCount}
              className={verticalDashClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


