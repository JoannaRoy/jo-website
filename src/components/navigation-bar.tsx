import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => setIsOpen(false);

  return (
    <div className="flex flex-col fixed bg-transparent top-0 right-0 pointer-events-none z-300">
      <button
        onClick={handleHamburgerClick}
        type="button"
        className="bg-transparent border-none m-4 absolute right-0 z-1001 pointer-events-auto"
        aria-label={isOpen ? "Close menu" : "Open menu"}
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

      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={close}
          className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-999 pointer-events-auto"
        />
      ) : null}

      <div
        className={[
          "fixed top-0 right-0 flex flex-col w-80 items-center h-screen shadow-md",
          "bg-(--white)",
          "transition-transform duration-400",
          "pointer-events-auto z-1000",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="h-12"></div>
        <Link to="/" onClick={close}>
          <h2 className="text-black font-bold text-base no-underline my-4">
            Home
          </h2>
        </Link>
        <Link to="/blog" onClick={close}>
          <h2 className="text-black font-bold text-base no-underline my-4">
            Blog
          </h2>
        </Link>
        <Link to="/projects" onClick={close}>
          <h2 className="text-black font-bold text-base no-underline my-4">
            Projects
          </h2>
        </Link>
        <Link to="/binjo" onClick={close}>
          <h2 className="text-black font-bold text-base no-underline my-4">
            BINJO
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
