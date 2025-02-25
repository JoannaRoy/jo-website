import React from "react";

const Footer: React.FC = () => {
  return (
    <div
      style={{
        height: "3rem",
        padding: "1rem",
        color: "var(--blue)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        width: "90%",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <p>welcome to my little corner of the internet :)</p>
    </div>
  );
};

export default Footer;
