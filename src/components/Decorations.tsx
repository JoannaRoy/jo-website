import React from "react";

const BasicDecoration = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "3rem",
        marginTop: "20px",
        backgroundRepeat: "repeat-x",
        backgroundSize: "3rem",
        ...style,
      }}
    ></div>
  );
};

const FlowerDecoration = ({ style }: { style: React.CSSProperties }) => {
  return (
    <BasicDecoration
      style={{
        backgroundImage: "url('/src/assets/flower.png')",
        ...style,
      }}
    ></BasicDecoration>
  );
};

export { BasicDecoration, FlowerDecoration };
