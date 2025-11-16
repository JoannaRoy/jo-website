import React from "react";
import { PageGrid } from "../components/item-grids";

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
