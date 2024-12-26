import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s",
  fontWeight: "bold",
  color: "black",
  margin: "0 10px",
};

const NavBar: React.FC = () => {
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        height: "2rem",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        position: "fixed",
        top: "20px",
        left: "20px",
        right: "20px",
        zIndex: "1000",
        borderRadius: "10px",
        // border: "3px solid white",
        backgroundColor: "var(--white)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={linkStyle}>
          <h2>Joanna</h2>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
        <Link to="/blog" style={linkStyle}>
          Blog
        </Link>
        <Link to="/projects" style={linkStyle}>
          Projects
        </Link>
        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>
        <Link to="/more" style={linkStyle}>
          More
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
