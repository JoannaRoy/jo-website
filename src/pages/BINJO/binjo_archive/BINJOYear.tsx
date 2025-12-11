import { BinjoBoard, parseBinjoCsv } from "react-binjo";

interface BINJOYearProps {
  year: number;
  csvData: string;
  title?: string;
}

export default function BINJOYear({ year, csvData, title }: BINJOYearProps) {
  const data = parseBinjoCsv(csvData);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <BinjoBoard
        data={data}
        title={title || `BINJO ${year}`}
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
