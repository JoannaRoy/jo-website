import React from "react";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import ProgressChart from "./BINJOProgress";
import { PlainBox } from "../../components/ItemBoxes";
import BinjoBingo from "./BINJO";
import WOW from "./WOW";

const BINJOHome: React.FC = () => {
  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div className="flex justify-center items-center w-full h-screen">
          <BinjoBingo />
          <PlainBox className="w-[30%] mx-24 bg-white/50">
            <h1 className="mt-8 text-2xl font-bold">
              Welcome to my new years resolution binjo!
            </h1>
            <p className="text-center">
              This binjo card shows all my bucket list items for 2025. The goal
              is to complete as many of them as I can, and every time I get a
              binjo (a full row / column / diagonal filled up), I get to spin my
              wheel of wishes and do something fun for myself :)
            </p>
          </PlainBox>
        </div>
        <div className="mt-24 w-full bg-gradient-to-br from-green-100 to-purple-200 p-20">
          <ProgressChart />
        </div>
        <div className="flex justify-center w-full h-screen mt-24">
          <WOW />
        </div>
      </PageGrid>
    </div>
  );
};

export default BINJOHome;
