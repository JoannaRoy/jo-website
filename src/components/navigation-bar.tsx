import type React from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/blog", label: "blog" },
  { to: "/projects", label: "projects" },
  { to: "/binjo", label: "binjo" },
];

const NavBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-(--white)/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between w-full px-4 sm:px-8 md:px-12 lg:px-16 py-3">
        <Link
          to="/"
          className="group flex items-center gap-2 font-bold! text-sm sm:text-base text-black! no-underline tracking-tight hover:text-(--purple)! transition-colors"
          aria-label="Home"
        >
          <img
            src="/jo.png"
            alt=""
            className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:rotate-12"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm sm:text-base font-bold! px-3 sm:px-4 py-1.5 rounded-md border transition-colors no-underline",
                  isActive
                    ? "text-black! bg-black/10 border-black/25"
                    : "text-black! bg-black/5 border-black/15 hover:text-(--purple)! hover:border-(--purple)/50 hover:bg-black/10",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
