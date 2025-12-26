import type React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PlainBox } from "@/components/item-box";
import { PageGrid } from "@/components/item-grids";
import BINJOHome2025 from "@/pages/BINJO/binjo_archive/2025/BINJOHome2025";

const archiveYears = [2025];

const BINJOArchive: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(archiveYears[0]);
  const contentRef = useRef<HTMLDivElement>(null);

  const renderYearContent = (year: number) => {
    switch (year) {
      case 2025:
        return <BINJOHome2025 />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <PageGrid columns={1} className="items-center">
        <div className="flex flex-col w-full py-8 items-center h-[80vh]">
          <PlainBox className="w-[90%] mx-4 mt-[25vh] mb-8 align-middle items-center">
            <h1 className="mb-4 mt-4 md:mt-8 text-2xl md:text-3xl font-bold text-center">
              BINJO Archive
            </h1>
            <p className="text-center text-sm md:text-base px-4 pb-4">
              Take a look back at previous years' BINJO cards and see how I did on my goals!
            </p>
            <div className="text-center mb-4">
              <Link 
                to="/binjo" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to current BINJO
              </Link>
            </div>
          </PlainBox>
          <div className="flex gap-4 mb-8 items-center text-b">
            <b>Select a Year:</b> {archiveYears.map((year) => (
              <button
                type="button"
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedYear === year 
                    ? "bg-purple-400 text-white shadow-lg scale-105" 
                    : "bg-purple-200 text-gray-700 hover:bg-purple-300 hover:shadow-md"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
         
        </div>

        <div id="archive-content" ref={contentRef}>
          {renderYearContent(selectedYear)}
        </div>
      </PageGrid>
    </div>
  );
};

export default BINJOArchive;
