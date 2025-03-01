import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="h-12 p-4 text-[var(--blue)] flex items-center justify-center w-[90%] bottom-0 left-0 right-0 m-10">
      <p className="text-center text-sm/8">
        welcome to my little corner of the internet :)
        <br />
        email: joannaroy6[at]gmail[dot]com | linkedin:{" "}
        <a href="https://www.linkedin.com/in/joanna-roy-162261195/">
          joanna-roy
        </a>{" "}
        | github: <a href="https://github.com/JoannaRoy">JoannaRoy</a>
      </p>
    </div>
  );
};

export default Footer;
