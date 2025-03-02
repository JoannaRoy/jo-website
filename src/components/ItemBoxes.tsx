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
      className={`flex flex-col gap-2.5 p-2.5 min-w-8 min-h-8 rounded bg-center bg-no-repeat z-10 ${
        borderColor ? `border-[3px] border-solid` : ""
      } ${className || ""}`}
      style={{
        borderColor: borderColor || "",
        ...style,
      }}
    >
      {title && <h2>{title}</h2>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Item Box Image"
          className="w-2/5 h-auto block rounded-lg"
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
      className="bg-contain"
    />
  );
};

const SparkleBox: React.FC<ItemBoxProps> = ({ style, ...props }) => {
  return (
    <ItemBox
      {...props}
      style={{
        aspectRatio: "1/1",
        ...style,
      }}
      className="bg-contain"
    />
  );
};

const PlainBox: React.FC<ItemBoxProps> = (props) => {
  return <ItemBox {...props} />;
};

export { CheckerBox, SparkleBox, PlainBox };
