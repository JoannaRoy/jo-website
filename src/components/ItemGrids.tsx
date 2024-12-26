import React from "react";

interface GridProps {
  columns: number;
  children: React.ReactNode;
}

const BaseGrid: React.FC<GridProps> = ({ columns, children }) => {
  return (
    <div
      style={{
        width: "100%",
        display: columns === 0 ? "flex" : "grid",
        flexDirection: columns === 0 ? "row" : undefined,
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        gridTemplateColumns:
          columns === 0 ? undefined : `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

const PageGrid: React.FC<GridProps> = ({ columns, children }) => {
  return (
    <>
      <div style={{ width: "100%", height: "8rem" }}></div>
      <BaseGrid columns={columns}>{children}</BaseGrid>
      <div style={{ width: "100%", height: "3rem" }}></div>
    </>
  );
};

const RegularGrid: React.FC<GridProps> = ({ columns, children }) => {
  return <BaseGrid columns={columns}>{children}</BaseGrid>;
};

export { PageGrid, RegularGrid };
