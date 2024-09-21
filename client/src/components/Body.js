import React from "react";
import { Box, Avatar, Typography, Link, IconButton } from "@mui/material";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Body = () => {
  return (
    <Box textAlign="center" p={3}>
      {/* Avatar Layer */}
      <Box>
        <Avatar
          src="path/to/your/avatar.jpg"
          alt="Avatar"
          sx={{ width: 150, height: 150, margin: "auto" }}
        />
      </Box>

      {/* Name and Job Description Layer */}
      <Box>
        <Typography variant="h4" component="h1">
          Joanna Roy
        </Typography>
        <Typography variant="subtitle1" component="p">
          Full Stack Developer
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
          <FaGithub style={{ fontSize: "24px" }} />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/joanna-roy-162261195/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin style={{ fontSize: "24px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Body;
