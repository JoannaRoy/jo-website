import type React from "react";

interface FlowerConfig {
  size: number;
  top: string;
  left?: string;
  right?: string;
  color: string;
  rotation: number;
}

interface ScatteredFlowersProps {
  count?: number;
  colors?: string[];
  centerColor?: string;
  opacity?: number;
  sizeRange?: { min: number; max: number };
  seed?: number;
  className?: string;
}

const defaultFlowers: FlowerConfig[] = [
  { size: 48, top: "10%", left: "5%", color: "#f9a8d4", rotation: 20 },
  { size: 32, top: "15%", right: "8%", color:  "#93c5fd", rotation: -15 },
  { size: 56, top: "65%", left: "10%", color: "#f87171", rotation: 45 },
  { size: 40, top: "70%", right: "12%", color: "#fef3c7", rotation: -30 },
  { size: 28, top: "35%", left: "15%", color: "#f9a8d4", rotation: 60 },
  { size: 44, top: "40%", right: "18%", color:  "#93c5fd", rotation: -45 },
  { size: 36, top: "85%", left: "20%", color: "#f87171", rotation: 15 },
  { size: 52, top: "20%", left: "25%", color: "#fef3c7", rotation: -60 },
  { size: 30, top: "80%", right: "25%", color: "#f9a8d4", rotation: 30 },
  { size: 46, top: "50%", left: "8%", color:  "#93c5fd", rotation: -20 },
  { size: 34, top: "25%", right: "15%", color: "#f87171", rotation: 50 },
  { size: 42, top: "90%", right: "8%", color: "#fef3c7", rotation: -40 },
];

export const ScatteredFlowers: React.FC<ScatteredFlowersProps> = ({
  count = 12,
  colors = ["#f87171", "#93c5fd", "#f9a8d4"],
  centerColor = "#fef3c7",
  opacity = 0.6,
  sizeRange = { min: 40, max: 80 },
  seed = 42,
  className = "",
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mobileCount = Math.min(count, 6);
  const mobileSizeRange = { min: 24, max: 48 };

  const generateFlowers = (): FlowerConfig[] => {
    const actualCount = isMobile ? mobileCount : count;
    const actualSizeRange = isMobile ? mobileSizeRange : sizeRange;
    
    if (actualCount === 12 && !isMobile) return defaultFlowers;

    const flowers: FlowerConfig[] = [];
    const random = (index: number, salt: number) => {
      const x = Math.sin(seed + index * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < actualCount; i++) {
      const size = actualSizeRange.min + random(i, 1) * (actualSizeRange.max - actualSizeRange.min);
      const top = `${10 + random(i, 2) * 80}%`;
      const useLeft = random(i, 3) > 0.5;
      const horizontalPos = `${5 + random(i, 4) * 25}%`;
      const rotation = -60 + random(i, 5) * 120;
      const color = colors[Math.floor(random(i, 6) * colors.length)];

      flowers.push({
        size: Math.round(size),
        top,
        ...(useLeft ? { left: horizontalPos } : { right: horizontalPos }),
        color,
        rotation: Math.round(rotation),
      });
    }

    return flowers;
  };

  const flowers = generateFlowers();

  return (
    <>
      {flowers.map(flower => (
        <svg
          key={flower.color + flower.size + flower.top + flower.left + flower.right + flower.rotation}
          className={`absolute ${className}`}
          style={{
            width: flower.size,
            height: flower.size,
            top: flower.top,
            left: flower.left,
            right: flower.right,
            fill: flower.color,
            transform: `rotate(${flower.rotation}deg)`,
            opacity,
          }}
          viewBox="0 0 300 300"
          aria-hidden="true"
        >
          <circle cx="50" cy="20" r="20" />
          <circle cx="20" cy="40" r="20" />
          <circle cx="80" cy="40" r="20" />
          <circle cx="30" cy="75" r="20" />
          <circle cx="70" cy="75" r="20" />
          <circle cx="50" cy="50" r="15" fill={centerColor} />
        </svg>
      ))}
    </>
  );
};
