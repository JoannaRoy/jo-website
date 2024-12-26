import React from "react";

interface ItemBoxProps {
  title?: React.ReactNode;
  borderColor?: string;
  textColor?: string;
  imageUrl?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  title,
  borderColor,
  textColor,
  width,
  height,
  imageUrl,
  children,
  backgroundImage,
  backgroundColor,
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
        aspectRatio: 1,
        minWidth: "5rem",
        minHeight: "5rem",
        fontSize: "small",
        borderRadius: "10px",
        // background
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // customizables
        border: borderColor ? `3px solid ${borderColor}` : "",
        color: textColor ? textColor : "var(--white)",
        maxWidth: width ? width : "40rem",
        width: width ? width : "",
        height: height ? height : "",
        backgroundImage: backgroundImage ? backgroundImage : "",
        backgroundColor: backgroundColor ? backgroundColor : "",
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
      backgroundImage={`url(src/assets/checkers.png)`}
      style={{
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
