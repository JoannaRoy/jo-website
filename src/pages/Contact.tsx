import React from "react";
import "../styling/Backgrounds.css";
import { PageGrid } from "../components/ItemGrids";
import { PlainBox } from "../components/ItemBoxes";

const Contact: React.FC = () => {
  return (
    <div className="contact-bgd">
      <PageGrid columns={2}>
        <PlainBox borderColor="white">this is some words about me</PlainBox>
      </PageGrid>
    </div>
  );
};

export default Contact;
