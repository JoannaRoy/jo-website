import React from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";
import "../App.css"; // Import the CSS file

const About = () => {
  return (
    <Container className="about-root">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt="Joanna Roy"
          src="/images/jo_in_the_wild.jpeg"
          className="avatar"
        />
        <Typography className="bio-head">joanna roy</Typography>
        <Typography className="bio">bla</Typography>
        <Typography className="bio">bla</Typography>
        <Typography className="bio">bla</Typography>
      </Box>
    </Container>
  );
};

export default About;
