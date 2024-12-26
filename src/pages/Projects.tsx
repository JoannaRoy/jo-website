import React from "react";
import "../styling/Backgrounds.css";
import { CheckerBox } from "../components/ItemBoxes";
import PageGrid from "../components/ItemGrids";

const Projects: React.FC = () => {
  return (
    <div className="projects-bgd">
      <PageGrid columns={3}>
        <CheckerBox
          title="welcome :)"
          imageUrl="/src/assets/jo.jpg"
          borderColor="white"
          textColor="white"
        ></CheckerBox>
      </PageGrid>
    </div>
  );
};

export default Projects;
