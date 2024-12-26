import React from "react";
import "../styling/Backgrounds.css";
import { CheckerBox } from "../components/ItemBoxes";
import { PageGrid } from "../components/ItemGrids";

const Blog: React.FC = () => {
  return (
    <div className="blog-bgd">
      <PageGrid columns={3}>
        <CheckerBox
          title="welcome :)"
          borderColor="white"
          textColor="white"
        ></CheckerBox>
      </PageGrid>
    </div>
  );
};

export default Blog;
