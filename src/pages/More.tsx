import React from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";

const More: React.FC = () => {
  return (
    <div>
      <PageGrid columns={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        ></div>
      </PageGrid>
    </div>
  );
};

export default More;
