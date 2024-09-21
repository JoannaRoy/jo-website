import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Box,
} from "@mui/material";
import sparkles from "../assets/sparkles.svg";
import "../App.css"; // Import the CSS file

const Header = () => {
  return (
    <AppBar position="fixed" className="headerContainer" height="15px">
      <Toolbar className="toolbar">
        <Box className="toolbox">
          <Link href="." color="inherit" underline="none" className="link">
            <Typography className="headerName">jo's website</Typography>
          </Link>
          <IconButton edge="start" aria-label="sparkles">
            <img src={sparkles} alt="sparkles" className="Sparkles" />
          </IconButton>
        </Box>
        <nav className="nav">
          <Typography className="toolbar-links">
            <Link href="#home" className="toolbar-link">
              home 🪹
            </Link>
            <Link href="#about" className="toolbar-link">
              about me 🧍‍♀️
            </Link>
            <Link href="#projects" className="toolbar-link">
              my projects 🌻
            </Link>
            <Link href="#jog-with-a-blog" className="toolbar-link">
              blog 🏃‍♀️‍➡️
            </Link>
          </Typography>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object,
};

export default Header;
