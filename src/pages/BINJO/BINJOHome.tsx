import React from "react";
import { Link } from "react-router-dom";
import { PageGrid } from "@/components/item-grids";
import { PlainBox } from "@/components/item-box";
import BINJO2026 from "@/pages/BINJO/BINJO2026";
import { BINJOGallery } from "@/pages/BINJO/BINJOGallery";
import { WOW } from "react-binjo";
import { FlowerRow } from "@/components/flower-row";
import { ScatteredFlowers } from "@/components/scattered-flowers";

const wowOptions = [
  "New book",
  "New gadget",
  "IKEA trip",
  "Nice meal out",
  "Massage",
  "New sports gear",
  "Choose your",
  "Concert ticket",
  "Spa day",
  "Home decor",
  "Clothing article",
  "Surprise!",
];

const BINJOHome: React.FC = () => {
  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div className="flex flex-col w-full min-h-screen py-8">
          <FlowerRow count={20} />
          <div className="flex flex-col md:flex-row justify-center items-center w-full flex-1">
            <PlainBox 
              className="w-[90%] md:w-[30%] mx-4 md:mx-24 mt-8 md:mt-0"
            >
              <h1 className="mb-4 md:mt-8 text-xl md:text-2xl font-bold text-center">
                Welcome to my new years resolution BINJO!
              </h1>
              <p className="text-center text-sm md:text-base p-2 md:p-0">
                This card shows all of my bucket list items for 2026. The goal
                is to complete as many of them as I can, and every time I get a
                binjo (a full row / column / diagonal filled up), I get to spin my
                wheel of wishes and do something fun for myself :)
              </p>
              <p className="text-center text-sm md:text-base p-2 md:p-0">
                If you want to make your own binjo card, you can use the <a href="https://www.npmjs.com/package/react-binjo">react-binjo</a> component.
              </p>
              <div className="text-center mt-4">
                <Link 
                  to="/binjo-archive/2025" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View BINJO Archive →
                </Link>
              </div>
            </PlainBox>
            <BINJO2026 />
          </div>
          <FlowerRow count={20} />
        </div>
        <div className="flex justify-center w-full min-h-screen mt-12 md:mt-24">
        <div className="flex flex-col items-center justify-center bg-cream p-4 md:p-10 w-full relative overflow-hidden">
          <ScatteredFlowers />
          <WOW 
            options={wowOptions}
            colors={{
              segmentColors: ["#f87171", "#60a5fa"],
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
        </div>
        <BINJOGallery year={2026} />
      </PageGrid>
    </div>
  );
};

export default BINJOHome;
