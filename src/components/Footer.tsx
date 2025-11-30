import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="h-auto p-4 text-[var(--blue)] flex items-center justify-center w-full bottom-0 left-0 right-0 mx-auto my-6 z-10">
      <p className="text-center text-sm/6 max-w-full break-words">
        welcome to my little corner of the internet :)
        <br className="md:block hidden" />
        <span className="md:inline block mt-2 md:mt-0">
          email: joannaroy6[at]gmail[dot]com 
        </span>
        <span className="md:inline block mt-2 md:mt-0">
        {' |'} linkedin:
          <a
            href="https://www.linkedin.com/in/joanna-roy-162261195/"
            className="hover:underline"
          >
            joanna-roy
          </a>
        </span>
        <span className="md:inline block mt-2 md:mt-0">
        {' |'} github:
          <a href="https://github.com/JoannaRoy" className="hover:underline">
            JoannaRoy
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
