import React from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";
import { PlainBox } from "../components/ItemBoxes";

const About: React.FC = () => {
  return (
    <>
      <div className="about-bgd">
        <PageGrid columns={2}>
          <PlainBox
            title="welcome :)"
            borderColor="var(--white)"
            width="80%"
            height="auto"
          >
            <p>hello i am jo! welcome to my website</p>
          </PlainBox>
        </PageGrid>
      </div>
    </>
  );
};

export default About;
