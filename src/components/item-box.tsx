import type React from "react";

interface ItemBoxProps {
  title?: React.ReactNode;
  imageUrl?: string;
  borderColour?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const PlainBox: React.FC<ItemBoxProps> = ({
  title,
  imageUrl,
  borderColour,
  children,
  style,
  className,
}) => {
  return (
    <div
      className={`flex flex-col gap-2.5 p-2.5 min-w-8 min-h-8 rounded bg-center bg-no-repeat z-10 ${
        borderColour ? `border-[3px] border-solid` : ""
      } ${className || ""}`}
      style={{
        borderColour: borderColour || "",
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
