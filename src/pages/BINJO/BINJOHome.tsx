import React from "react";
import { PageGrid } from "@/components/item-grids";
import ProgressChart from "@/pages/BINJO/BINJOProgress";
import { PlainBox } from "@/components/item-box";
import BinjoBingo from "@/pages/BINJO/BINJO";
import WOW from "@/pages/BINJO/WOW";
import { BINJOGallery } from "@/pages/BINJO/BINJOGallery";

const BINJOHome: React.FC = () => {

  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen py-8">
          <PlainBox className="w-[90%] md:w-[30%] mx-4 md:mx-24 mt-8 md:mt-0">
            <h1 className="mb-4 md:mt-8 text-xl md:text-2xl font-bold text-center">
              Welcome to my new years resolution binjo!
            </h1>
            <p className="text-center text-sm md:text-base p-2 md:p-0">
              This binjo card shows all my bucket list items for 2025. The goal
              is to complete as many of them as I can, and every time I get a
              binjo (a full row / column / diagonal filled up), I get to spin my
              wheel of wishes and do something fun for myself :)
            </p>
          </PlainBox>
          <BinjoBingo />
        </div>
        <div className="mt-12 md:mt-24 w-full bg-gradient-to-br from-green-100 to-purple-200 p-4 md:p-20">
          <ProgressChart />
        </div>
        <div className="flex justify-center w-full min-h-screen mt-12 md:mt-24">
          <WOW />
        </div>
        <BINJOGallery />  
      </PageGrid>
    </div>
  );
};

export default BINJOHome;
