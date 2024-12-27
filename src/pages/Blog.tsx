import React from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";

const Blog: React.FC = () => {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };
  const infoList = [
    { title: "Title 1", content: "Content 1" },
    { title: "Title 2", content: "Content 2" },
    { title: "Title 3", content: "Content 3" },
  ];
  const imageList = ["/src/assets/blog-bgd1.png", "/src/assets/blog-bgd2.png"];

  return (
    <div>
      <PageGrid columns={1}>
        <div
          style={{
            flexDirection: "row",
            width: "100%",
            ...divStyle,
          }}
        >
          <div
            style={{
              width: "90vw",
              flexDirection: "column",
              right: "0",
              padding: "2rem",
              ...divStyle,
            }}
          >
            <h1 style={{ fontSize: "3rem" }}>hummus purée</h1>
            <h2 style={{ fontSize: "1rem" }}>a blog</h2>
          </div>
        </div>
        {infoList.map((info, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${imageList[index % 2]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "90vw",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h1>{info.title}</h1>
            <p>{info.content}</p>
          </div>
        ))}
      </PageGrid>
    </div>
  );
};

export default Blog;
