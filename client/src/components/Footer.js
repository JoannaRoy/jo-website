import React from "react";
// import { Box, Avatar, Typography, Link, IconButton } from "@mui/material";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../App.css"; // Import the CSS file

const Footer = () => {
  return (
    <Box className="root">
      {/* Name and Job Description Layer */}
      <Box>
        <Typography variant="subtitle1" component="p" fontSize="5px">
          welcome to my little corner of the internet 😁
        </Typography>
      </Box>

      {/* GitHub and LinkedIn Layer */}
      <Box>
        <IconButton
          component={Link}
          href="https://github.com/joannaroy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icon" />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/joanna-roy-162261195/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" />
        </IconButton>
      </Box>

      {/* Avatar Layer */}
      {/* Uncomment this section when needed
      <Box>
        <Avatar
          src="/images/jo.png"
          alt="jo avatar"
          className="avatar"
        />
      </Box> */}
    </Box>
  );
};

export default Footer;
