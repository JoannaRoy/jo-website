import styled from "styled-components";
import { useState } from "react";
import { progressData } from "@/pages/BINJO/BINJOContent";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const BingoCard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(4rem, 6rem));
  background-size: cover;
  background-position: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
    padding: 0.5rem;
  }

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
  const [clickedItems, setClickedItems] = useState<string[]>([]);

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
        className="font-bold text-black mb-8 mt-10 tracking-widest text-center"
        style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
      >
        BINJO
      </h1>
      <div className="flex flex-row items-center gap-4 mb-8 sm:hidden">
        <div className="flex items-center gap-1">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{ backgroundColor: "var(--completed-color)" }}
          ></div>
          <span className="text-xs sm:text-sm">Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{ backgroundColor: "var(--planned-color)" }}
          ></div>
          <span className="text-xs sm:text-sm">Planned</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            style={{ backgroundColor: "var(--remaining-color)" }}
          ></div>
          <span className="text-xs sm:text-sm">Remaining</span>
        </div>
      </div>
      <BingoCard>
        {progressData.flat().map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-black text-center text-xs md:text-smsfont-semibold rounded-lg p-2 relative
              ${
                item.item === "Website"
                  ? "bg-gradient-to-br from-green-300 to-purple-400 font-bold shadow-lg"
                  : index % 2 === 0
                  ? colors.purple + " bg-opacity-50"
                  : colors.blue + " bg-opacity-50"
              }
              w-16 h-16 md:w-24 md:h-24
            `}
            onMouseEnter={() => setHoveredItem(item.item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              if (clickedItems.includes(item.item)) {
                setClickedItems(clickedItems.filter((i) => i !== item.item));
              } else {
                setClickedItems([...clickedItems, item.item]);
              }
            }}
          >
            <span className="opacity-100 z-10 text-[10px] md:text-xs mb-1">
              {item.item}
            </span>

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

            {/* Show pie chart on mobile when clicked */}
            {clickedItems.includes(item.item) && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg z-20">
                <div className="w-[80%] h-[80%] p-1">
                  <PieChart
                    completed={item.completed}
                    planned={item.planned}
                    remaining={item.remaining}
                  />
                </div>
              </div>
            )}

            {/* Show pie chart on hover for desktop */}
            {hoveredItem === item.item && (
              <div className="absolute text-white p-2 rounded z-20 w-full h-full left-1/2 transform -translate-x-1/2 hidden sm:block items-center justify-center">
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
