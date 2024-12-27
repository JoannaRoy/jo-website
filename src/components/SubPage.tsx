import { useParams } from "react-router-dom";
import React from "react";

interface Content {
  title: string;
  content: string;
}

const SubPagePreview: React.FC<{
  content: Content;
  image: string;
  boxStyle?: React.CSSProperties;
}> = ({ content, image, boxStyle }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "20px",
        paddingBottom: "20px",
        ...boxStyle,
      }}
    >
      <h1>{content.title}</h1>
      <p>
        {content.content.length > 100
          ? content.content.substring(0, 100) + " ..."
          : content.content}
      </p>
    </div>
  );
};

const SubPage: React.FC<{ contentList: Content[]; imageList: string[] }> = ({
  contentList,
  imageList,
}) => {
  const { index } = useParams<"index">();
  const selectedIndex = index ? Number(index) : -1;
  const selectedContent = contentList[selectedIndex];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--white)",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        width: "90vw",
        height: "90vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "5px",
          right: "10px",
          cursor: "pointer",
          border: "none",
          backgroundColor: "transparent",
          color: "black",
          fontSize: "24px",
        }}
        onClick={() => window.history.back()}
      >
        X
      </button>
      <div
        style={{
          backgroundImage: `url(${
            imageList[selectedIndex % imageList.length]
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "20px",
          paddingBottom: "20px",
          width: "90%",
        }}
      >
        <h1>{selectedContent.title}</h1>
      </div>
      <p>{selectedContent.content}</p>
    </div>
  );
};

export { SubPage, SubPagePreview };
export type { Content };
