import React from "react";

interface ItemBoxProps {
  title?: React.ReactNode;
  imageUrl?: string;
  borderColor?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  title,
  imageUrl,
  borderColor,
  children,
  style,
  className,
}) => {
  return (
    <div
      className={`item-box ${className}`}
      style={{
        // position
        display: "flex",
        zIndex: 10,
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
        // size
        minWidth: "2rem",
        minHeight: "2rem",
        borderRadius: "5px",
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
        backgroundSize: "contain",
        aspectRatio: "1/1",
        ...style,
      }}
    />
  );
};

const PlainBox: React.FC<ItemBoxProps> = (props) => {
  return <ItemBox {...props} />;
};

export { CheckerBox, SparkleBox, PlainBox };
