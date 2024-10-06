import React from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";
import "../App.css"; // Import the CSS file

const About = () => {
  return (
    <Container className="about-root" id="about-me">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Joanna Roy"
          src="/images/jo_in_the_wild.jpeg"
          className="avatar"
        />
        <Typography className="subsection-head">joanna roy</Typography>
        <Typography className="subsection-text">bla</Typography>
        <Typography className="subsection-text">bla</Typography>
        <Typography className="subsection-text">bla</Typography>
      </Box>
    </Container>
  );
};

export default About;
