import { BinjoBoard, parseBinjoCsv } from "react-binjo";
import rawCsv from "@/blog_data/2026_binjo_progress.csv?raw";

const data = parseBinjoCsv(rawCsv);

const customColors = {
  completed: "var(--binjo-completed)",
  planned: "var(--binjo-planned)",
  remaining: "var(--binjo-remaining)",
  cellEven: "var(--binjo-cell-even)",
  cellOdd: "var(--binjo-cell-odd)",
  centerCell: "var(--binjo-center-cell)",
};

const customFonts = {
  title: "'Fredoka', system-ui, sans-serif",
  cell: "'Poppins', sans-serif",
};

const CustomStar = () => (
  <svg viewBox="0 0 24 24" fill="#f9a8d4" style={{ width: "85%", height: "85%" }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function BINJO2026() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <BinjoBoard
        data={data}
        title="BINJO"
        colors={customColors}
        fonts={customFonts}
        starIcon={<CustomStar />}
      />
    </div>
  );
}
