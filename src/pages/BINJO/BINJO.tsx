import { BinjoBoard, parseBinjoCsv } from "react-binjo";
import rawCsv from "@/blog_data/2025_binjo_progress.csv?raw";

const data = parseBinjoCsv(rawCsv);

export default function BinjoBingo() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <BinjoBoard
        data={data}
        title="BINJO"
        starIcon="/assets/star.svg"
        colors={{
          cellEven: "#d8b4fe",
          cellOdd: "#93c5fd",
        }}
        fonts={{
          title: "'Fredoka', system-ui, sans-serif",
          cell: "'Inter', system-ui, sans-serif",
        }}
      />
    </div>
  );
}
