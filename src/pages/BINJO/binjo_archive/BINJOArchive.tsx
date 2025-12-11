import React from "react";
import { Link, useParams } from "react-router-dom";
import { PageGrid } from "@/components/item-grids";
import { PlainBox } from "@/components/item-box";
import { Binjo2025, WOW2025 } from "@/pages/BINJO/binjo_archive/BINJO2025";
import { BINJOGallery } from "@/pages/BINJO/BINJOGallery";

const yearComponents: Record<number, { BinjoComponent: React.FC; WOWComponent: React.FC }> = {
  2025: {BinjoComponent: Binjo2025, WOWComponent: WOW2025},
};

const BINJOArchive: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const yearNum = parseInt(year || "2025", 10);
  const { BinjoComponent, WOWComponent } = yearComponents[yearNum];

  if (!BinjoComponent || !WOWComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Archive not found for {yearNum}</h1>
        <Link to="/binjo/current" className="text-blue-600 hover:text-blue-800 underline mt-4">
          ← Back to current BINJO
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen py-8">
          <PlainBox className="w-[90%] md:w-[30%] mx-4 md:mx-24 mt-8 md:mt-0">
            <h1 className="mb-4 md:mt-8 text-xl md:text-2xl font-bold text-center">
              BINJO Archive: {yearNum}
            </h1>
            <p className="text-center text-sm md:text-base p-2 md:p-0">
              This was my {yearNum} new years resolution binjo card! It shows all my
              bucket list items for {yearNum} and how I did on them.
            </p>
            <div className="text-center mt-4">
              <Link 
                to="/binjo/current" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to current BINJO
              </Link>
            </div>
          </PlainBox>
          <BinjoComponent />
        </div>
        <WOWComponent />
        <BINJOGallery year={yearNum} />
      </PageGrid>
    </div>
  );
};

export default BINJOArchive;
