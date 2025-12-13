import { BinjoBoard, parseBinjoCsv, WOW } from "react-binjo";
import rawCsv from "@/blog_data/2025_binjo_progress.csv?raw";

const data = parseBinjoCsv(rawCsv);

const wowOptions = [
  "New book",
  "New gadget",
  "IKEA trip",
  "Nice meal out",
  "Massage",
  "New sports gear",
  "Mystery prize",
  "Concert ticket",
  "Spa day",
  "Home decor",
  "Clothing article",
  "Surprise!",
];

function Binjo2025() {
  return (
    <div className="flex flex-col items-center justify-center p-4 binjo-smaller-text">
      <BinjoBoard
        data={data}
        title="BINJO 2025"
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

function WOW2025() {
  return (
    <div>
      <WOW 
        options={wowOptions}
        colors={{
          segmentColors: ["#4cbba4", "#88be74"],
          text: "#ffffff",
        }}
        pointer={{
          src: "/assets/pink-arrow.svg",
          width: 90,
          rotation: 135
        }}
        showTitle={false}
        confetti={true}
      />
    </div>
  );
}

export { Binjo2025, WOW2025 };