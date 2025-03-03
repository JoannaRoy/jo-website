import styled from "styled-components";
import { useState } from "react";
import { progressData } from "./BINJOContent";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const BingoCard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 6rem);
  background-size: cover;
  background-position: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
  }
`;

interface PieChartProps {
  completed: number;
  planned: number;
  remaining: number;
}

const PieChart: React.FC<PieChartProps> = ({
  completed,
  planned,
  remaining,
}) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const completedColor = rootStyles
    .getPropertyValue("--completed-color")
    .trim();
  const plannedColor = rootStyles.getPropertyValue("--planned-color").trim();
  const remainingColor = rootStyles
    .getPropertyValue("--remaining-color")
    .trim();

  return (
    <Pie
      data={{
        labels: ["Completed", "Planned", "Remaining"],
        datasets: [
          {
            data: [completed, planned, remaining],
            backgroundColor: [completedColor, plannedColor, remainingColor],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              family: "monospace",
              size: 14,
              style: "normal",
            },
            bodyFont: {
              family: "monospace",
              size: 14,
              style: "normal",
            },
          },
        },
      }}
      width={90}
      height={90}
    />
  );
};

export default function BinjoBingo() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const colors = {
    orange: "bg-orange-300", // Soft Orange
    pink: "bg-pink-300", // Peach Pink
    purple: "bg-purple-300", // Lavender Purple
    blue: "bg-blue-300", // Sky Blue
    green: "bg-green-300", // Mint Green
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1
        className="font-bold text-black mb-8 tracking-widest"
        style={{ fontSize: "3rem" }}
      >
        BINJO
      </h1>
      <BingoCard>
        {progressData.flat().map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-black text-center text-xs font-semibold w-24 h-24 rounded-lg p-2 relative
              ${
                item.item === "Website"
                  ? "bg-gradient-to-br from-green-300 to-purple-400 font-bold shadow-lg"
                  : index % 2 === 0
                  ? colors.purple + " bg-opacity-50"
                  : colors.blue + " bg-opacity-50"
              }
            `}
            onMouseEnter={() => setHoveredItem(item.item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className="opacity-100 z-10">{item.item}</span>
            {item.completed === 100 && (
              <span className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/assets/star.svg"
                  alt="Star"
                  width="90%"
                  height="90%"
                  style={{ opacity: 0.9, zIndex: 1 }}
                />
              </span>
            )}
            {hoveredItem === item.item && (
              <div className="absolute text-white p-2 rounded z-20">
                <PieChart
                  completed={item.completed}
                  planned={item.planned}
                  remaining={item.remaining}
                />
              </div>
            )}
          </div>
        ))}
      </BingoCard>
    </div>
  );
}
