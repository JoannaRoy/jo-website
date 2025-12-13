import React from "react";
import { PageGrid } from "@/components/item-grids";
import { PlainBox } from "@/components/item-box";
import { Binjo2025, WOW2025 } from "@/pages/BINJO/binjo_archive/2025/BINJO2025";
import { BINJOGallery } from "@/pages/BINJO/BINJOGallery";

const BINJOHome2025: React.FC = () => {

  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen py-8">
          <PlainBox className="w-[90%] md:w-[30%] mx-4 md:mx-24 mt-8 md:mt-0">
            <h1 className="mb-4 md:mt-8 text-xl md:text-2xl font-bold text-center">
              BINJO Archive: 2025
            </h1>
            <p className="text-center text-sm md:text-base p-2 md:p-0">
              This binjo card shows all my bucket list items for 2025. The goal
              is to complete as many of them as I can, and every time I get a
              binjo (a full row / column / diagonal filled up), I get to spin my
              wheel of wishes and do something fun for myself :)
            </p>
          </PlainBox>
          <Binjo2025 />
        </div>
        <BINJOGallery 
          year={2025} 
          gradientFrom="from-green-100"
          gradientVia="via-green-100"
          gradientTo="to-purple-200"
        />  
        <div className="flex justify-center w-full min-h-screen mt-12 md:mt-24">
          <WOW2025 />
        </div>
      </PageGrid>
    </div>
  );
};

export default BINJOHome2025;
