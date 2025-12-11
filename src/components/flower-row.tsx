import React from "react";

interface FlowerRowProps {
  count?: number;
  colors?: string[];
  centerColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const FlowerRow: React.FC<FlowerRowProps> = ({
  count = 15,
  colors = ["var(--binjo-cell-even)", "var(--binjo-cell-odd)", "#f9a8d4"],
  centerColor = "#fef3c7",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 md:w-8 md:h-8",
    md: "w-8 h-8 md:w-12 md:h-12",
    lg: "w-12 h-12 md:w-16 md:h-16",
  };

  return (
    <div className={`flex justify-between items-center w-full py-8 md:py-12 px-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          className={`${sizeClasses[size]} flex-shrink-0`}
          viewBox="0 0 300 300"
          style={{
            fill: colors[index % colors.length],
          }}
        >
          <circle cx="50" cy="20" r="20" />
          <circle cx="20" cy="40" r="20" />
          <circle cx="80" cy="40" r="20" />
          <circle cx="30" cy="75" r="20" />
          <circle cx="70" cy="75" r="20" />
          <circle cx="50" cy="50" r="15" fill={centerColor} />
        </svg>
      ))}
    </div>
  );
};
