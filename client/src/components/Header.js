import React from "react";
import sparkles from "../assets/sparkles.svg";

const Header = () => {
  return (
    <header className="Header">
      <div className="header-text">jo's website</div>
      <img src={sparkles} className="Sparkles" alt="sparkles" />
      <div className="header-container">
        <div className="nav-item">
          <a href="#home" className="nav-links">
            home 🪹
          </a>
        </div>
        <div className="nav-item">
          <a href="#about" className="nav-links">
            about me 🧍‍♀️
          </a>
        </div>
        <div className="nav-item">
          <a href="#projects" className="nav-links">
            my projects 🌻
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
