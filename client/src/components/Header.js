import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import sparkles from "../assets/sparkles.svg";
import "../App.css"; // Import the CSS file

const Header = () => {
  return (
    <AppBar position="fixed" className="headerContainer">
      <Toolbar className="toolbar">
        <Box className="toolbox">
          <Link
            to="/"
            className="toolbar-links"
            style={{ textDecoration: "none", color: "inherit" }} // This ensures the Link styling
          >
            <Typography className="headerName">jo's website</Typography>
          </Link>
          <IconButton edge="start" aria-label="sparkles">
            <img src={sparkles} alt="sparkles" className="Sparkles" />
          </IconButton>
        </Box>
        <nav className="nav">
          <Typography className="toolbar-links">
            <Link to="/" className="toolbar-link">
              home 🪹
            </Link>
            <Link to="/about" className="toolbar-link">
              about me 🧍‍♀️
            </Link>
            <Link to="/projects" className="toolbar-link">
              my projects 🌻
            </Link>
            <Link to="/blog" className="toolbar-link">
              blog 🏃‍♀️‍➡️
            </Link>
            <Link to="/german" className="toolbar-link">
              german 🥨
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
