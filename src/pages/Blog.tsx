import React, { useState } from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";
import { PlainBox } from "../components/ItemBoxes";

const Blog: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpinClick = () => {
    setIsSpinning(true);
    setRotation(Math.random() * 360);
    setTimeout(() => setIsSpinning(false), 4000);
  };

  const spinStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: `transform ${(Math.abs(rotation) / 360) * 4}s linear`,
  };

  const finalStyle = {
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <div className="blog-bgd">
      <PageGrid columns={2}>
        <img src="/src/assets/binjo.png" alt="Binjo" width="80%" />
        <PlainBox borderColor="white">
          this is some context for the bingo
        </PlainBox>
        <PlainBox borderColor="white">
          this is some context for the wheel
        </PlainBox>
        <div
          style={{
            position: "relative",
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
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
      </PageGrid>
    </div>
  );
};

export default Blog;
