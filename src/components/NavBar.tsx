import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      (navBarRef.current &&
        !navBarRef.current.contains(event.target as Node)) ||
      (hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node))
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={navBarRef}
      className={`flex flex-col fixed bg-transparent top-0 right-0 ${
        isOpen ? "z-[1000]" : "z-0"
      }`}
    >
      <button
        ref={hamburgerRef}
        onClick={handleHamburgerClick}
        type="button"
        className="bg-transparent border-none m-4 absolute right-0 z-[1001]"
      >
        <div
          className={`w-[35px] h-[4px] mb-[8px] transition-transform duration-400 bg-black origin-left ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
        <div
          className={`w-[35px] h-[4px] mb-[8px] transition-transform duration-400 ${
            isOpen ? "bg-transparent" : "bg-black"
          }`}
        />
        <div
          className={`w-[35px] h-[4px] mb-[8px] transition-transform duration-400 bg-black origin-left ${
            isOpen ? "-rotate-45" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`flex flex-col w-80 items-center bg-[var(--white)] h-screen shadow-md ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-400 ${isOpen ? "z-[1000]" : "z-0"}`}
      >
        <div className="h-12"></div>
        <Link to="/">
          <h2 className="text-black font-bold text-base no-underline my-4">
            Home
          </h2>
        </Link>
        <Link to="/blog">
          <h2 className="text-black font-bold text-base no-underline my-4">
            Blog
          </h2>
        </Link>
        <Link to="/binjo">
          <h2 className="text-black font-bold text-base no-underline my-4">
            BINJO
          </h2>
        </Link>
        <Link
          to="/mind-map"
          className="text-black font-bold text-base no-underline my-4"
        >
          Mind Map
        </Link>
        {/* <Link to="/projects" className="text-black font-bold text-base no-underline my-4">
          Projects
        </Link>
        <Link to="/contact" className="text-black font-bold text-base no-underline my-4">
          Contact
        </Link>
        <Link to="/more" className="text-black font-bold text-base no-underline my-4">
          More
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;
