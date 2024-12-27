import React from "react";

interface GridProps {
  columns: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const BaseGrid: React.FC<GridProps> = ({ columns, children, style }) => {
  return (
    <div
      style={{
        width: "100vw",
        display: columns === 0 ? "flex" : "grid",
        flexDirection: columns === 0 ? "row" : undefined,
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        gridTemplateColumns:
          columns === 0 ? undefined : `repeat(${columns}, 1fr)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const PageGrid: React.FC<GridProps> = ({ columns, children, style }) => {
  return (
    <>
      <div style={{ width: "100%", height: "4rem" }}></div>
      <BaseGrid columns={columns} style={style}>
        {children}
      </BaseGrid>
      <div style={{ width: "100%", height: "1rem" }}></div>
    </>
  );
};

const RegularGrid: React.FC<GridProps> = ({ columns, children }) => {
  return <BaseGrid columns={columns}>{children}</BaseGrid>;
};

const ItemGroup: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  columns?: number;
  rows?: number;
  title: string;
}> = ({ columns, rows, children, style, title }) => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "left", marginLeft: "20px" }}>{title}</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columns
              ? `repeat(${columns}, 1fr)`
              : undefined,
            gridTemplateRows: rows ? `repeat(${rows}, 1fr)` : undefined,
            placeItems: "center",
            gap: "10px",
            ...style,
          }}
        >
          {children}
        </div>
      </div>
      <div style={{ width: "10vw" }}></div>
    </div>
  );
};

export { PageGrid, RegularGrid, ItemGroup };
