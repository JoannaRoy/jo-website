import React from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";

const About: React.FC = () => {
  const infoList = [
    { title: "Title 1", content: "Content 1" },
    { title: "Title 2", content: "Content 2" },
    { title: "Title 3", content: "Content 3" },
  ];
  const imageList = ["/src/assets/blog-bgd1.png", "/src/assets/blog-bgd2.png"];
  return (
    <div>
      <PageGrid columns={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {infoList.map((info, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${imageList[index % 2]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "10rem",
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
        </div>
      </PageGrid>
    </div>
  );
};

export default About;
