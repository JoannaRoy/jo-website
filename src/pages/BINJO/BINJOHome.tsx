// import React, { useState } from "react";
import React from "react";
import "../../styling/Backgrounds.css";
import { PageGrid } from "../../components/ItemGrids";
import ProgressChart from "./BINJOProgress";
import { PlainBox } from "../../components/ItemBoxes";
import BinjoBingo from "./BINJO";
// import WOW from "./WOW";

const BINJOHome: React.FC = () => {
  // const [isSpinning, setIsSpinning] = useState(false);
  // const [rotation, setRotation] = useState(0);

  // const handleSpinClick = () => {
  //   setIsSpinning(true);
  //   setRotation(Math.random() * 360);
  //   setTimeout(() => setIsSpinning(false), 4000);
  // };

  // const spinStyle = {
  //   transform: `rotate(${rotation}deg)`,
  //   transition: `transform ${(Math.abs(rotation) / 360) * 4}s linear`,
  // };

  // const finalStyle = {
  //   transform: `rotate(${rotation}deg)`,
  // };

  return (
    <div>
      <PageGrid columns={1} style={{ alignItems: "left" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <BinjoBingo />
          <PlainBox
            style={{
              width: "30%",
              margin: "100px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <h1 style={{ marginTop: "30px" }}>
              Welcome to my new years resolution binjo!
            </h1>
            <p style={{ textAlign: "center" }}>
              This binjo card shows all my bucket list items for 2025. The goal
              is to complete as many of them as I can, and every time I get a
              binjo (a full row / column / diagonal filled up), I get to spin my
              wheel of wishes and do something fun for myself :)
            </p>
          </PlainBox>
        </div>
        <ProgressChart style={{ marginTop: "100px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            marginTop: "100px",
          }}
        >
          {/* <WOW /> */}
          {/* <div
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "50%",
            }}
          >
            <img
              src="/src/assets/WOW.png"
              alt="WOW"
              style={{
                width: "60%",
                cursor: "pointer",
                ...(isSpinning ? spinStyle : finalStyle),
                zIndex: 1,
              }}
              onClick={handleSpinClick}
            />
            <img
              src="/src/assets/WOW-bgd.png"
              alt="Background"
              style={{
                width: "100%",
                height: "auto",
                position: "absolute",
                zIndex: 0,
              }}
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          ></div> */}
        </div>
      </PageGrid>
    </div>
  );
};

export default BINJOHome;
