import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export interface HamburgerProps {
  onClick: () => void;
  isInitiallyOpen?: boolean;
}

const commonStyle = {
  width: "25px",
  height: "3px",
  marginBottom: "6px",
  transition: "transform 0.4s",
};

export function Hamburger(props: HamburgerProps) {
  const { onClick, isInitiallyOpen } = props;
  const [isOpen, setIsOpen] = useState<boolean>(isInitiallyOpen ?? false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onClick();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("click", handleOutsideClick);

  return (
    <button
      ref={hamburgerRef}
      onClick={handleClick}
      type="button"
      style={{
        backgroundColor: "transparent",
        border: "none",
        zIndex: isOpen ? 1001 : 0,
        margin: "1rem",
        position: "absolute",
        right: 0,
      }}
    >
      <div
        style={{
          ...commonStyle,
          backgroundColor: "black",
          transform: `rotate(${isOpen ? "45deg" : "0"})`,
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          ...commonStyle,
          backgroundColor: isOpen ? "transparent" : "black",
        }}
      />
      <div
        style={{
          ...commonStyle,
          backgroundColor: "black",
          transform: `rotate(${isOpen ? "-45deg" : "0"})`,
          transformOrigin: "left center",
        }}
      />
    </button>
  );
}

const linkStyle = {
  color: "black",
  fontWeight: "bold",
  fontSize: "1rem",
  textDecoration: "none",
  margin: "1rem 0",
};

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      navBarRef.current &&
      !navBarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("click", handleOutsideClick);

  return (
    <div
      ref={navBarRef}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        backgroundColor: "transparent",
        top: 0,
        right: 0,
        zIndex: isOpen ? 1000 : 0,
        transition: "z-index 0.5s",
      }}
    >
      <Hamburger onClick={handleHamburgerClick} isInitiallyOpen={isOpen} />
      <div
        style={{
          display: "flex",
          zIndex: isOpen ? 1000 : 0,
          flexDirection: "column",
          width: "15rem",
          alignItems: "center",
          backgroundColor: "var(--white)",
          height: "100vh",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s",
        }}
      >
        <div style={{ height: "3rem" }}></div>
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
    </div>
  );
};

export default NavBar;
