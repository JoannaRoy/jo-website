import type React from "react";

interface DashRowProps {
  count?: number;
  colours?: string[];
  thicknessClassName?: string;
  dashWidthClassName?: string;
  className?: string;
}

export const DashRow: React.FC<DashRowProps> = ({
  count = 10,
  colours = ["bg-red-200", "bg-blue-200", "bg-green-200"],
  thicknessClassName = "h-2",
  dashWidthClassName = "w-8",
  className = "",
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const displayCount = isMobile ? Math.min(count, 10) : count;

  return (
    <div className={`flex justify-between items-center w-full px-4 ${className}`}>
      {Array.from({ length: displayCount }).map((_, index) => (
        <div
          key={`dash-${index}-${colours[index % colours.length]}-${thicknessClassName}-${dashWidthClassName}`}
          className={`${dashWidthClassName} ${thicknessClassName} ${colours[index % colours.length]} rounded-full shrink-0`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};


