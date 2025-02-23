import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";

const colors = ["#4cbba4", "#88be74"];

const options = [
  "New book",
  "New gadget",
  "IKEA trip",
  "Nice meal out",
  "Massage",
  "New sports gear :)",
  "???",
  "Concert ticket",
  "Spa day",
  "Home decor",
  "Clothing article",
  "???",
];

const data = options.map((option, index) => ({
  option: option
    .padEnd(option === "???" ? 3 : option.length + 3, " ")
    .padStart(option.length + 3, " "),
  style: {
    backgroundColor: colors[index % 2],
    textColor: "#fff",
  },
}));

const WOW: React.FC = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsConfettiActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Spin the Prize Wheel!
      </h1>
      <div className="[&>div]:!border-0" onClick={handleSpinClick}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#93c5fd", "#6ee7b7"]}
          textColors={["#ffffff"]}
          fontFamily="monospace"
          fontSize={14}
          fontWeight={1000}
          outerBorderColor="#ffffff"
          radiusLineWidth={0}
          onStopSpinning={() => {
            setIsConfettiActive(true);
            setMustSpin(false);
          }}
          spinDuration={1}
          pointerProps={{
            src: "/src/assets/WOW_arrow.png",
            style: {
              transform: "rotate(310deg)",
              width: "90px",
            },
          }}
        />
        {isConfettiActive && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight * 5}
            numberOfPieces={400}
            gravity={0.5}
            initialVelocityY={10}
          />
        )}
      </div>
    </div>
  );
};

export default WOW;
