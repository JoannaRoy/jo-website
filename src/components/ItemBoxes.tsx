import React from "react";

interface ItemBoxProps {
  title?: React.ReactNode;
  imageUrl?: string;
  borderColor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  title,
  imageUrl,
  borderColor,
  children,
  style,
}) => {
  return (
    <div
      className="item-box"
      style={{
        // position
        display: "flex",
        zIndex: 10,
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        // size
        minWidth: "5rem",
        minHeight: "5rem",
        borderRadius: "10px",
        // background
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // customizables
        border: borderColor ? `3px solid ${borderColor}` : "",
        ...style,
      }}
    >
      {title && <h2>{title}</h2>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Item Box Image"
          style={{
            width: "40%",
            height: "auto",
            display: "block",
            borderRadius: "10px",
          }}
        />
      )}

      {children}
    </div>
  );
};

const CheckerBox: React.FC<ItemBoxProps> = ({ style, ...props }) => {
  return (
    <ItemBox
      {...props}
      style={{
        backgroundImage: `url(src/assets/checkers.png)`,
        backgroundSize: "contain",
        ...style,
      }}
    />
  );
};

const SparkleBox: React.FC<ItemBoxProps> = ({ style, ...props }) => {
  return (
    <ItemBox
      {...props}
      style={{
        backgroundSize: "cover",
        ...style,
      }}
    />
  );
};

const PlainBox: React.FC<ItemBoxProps> = (props) => {
  return <ItemBox {...props} />;
};

export { CheckerBox, SparkleBox, PlainBox };
