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
import { makeStyles } from "@mui/styles";
import sparkles from "../assets/sparkles.svg";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    justifyContent: "center",
    zIndex: 2,
    display: "flex",
    padding: "0",
  },
  toolbar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#497750",
    zIndex: 2,
    minHeight: "30px !important",
  },
  toolbox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#497750",
    zIndex: 2,
    display: "flex",
  },
  headerName: {
    margin: "0 5px",
    animation: "show 0.5s",
    position: "flex",
    fontWeight: "bold !important",
    fontSize: "0.5rem !important",
    padding: "0 2px",
  },
  nav: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    fontSize: "0.5rem",
    padding: "0 5px",
  },
  link: {
    padding: "0 10px",
  },
  img: {
    height: 10,
    padding: "0 5px",
  },

  iconButton: {
    padding: "0px", // Reduce padding of icon button
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.headerContainer} height="15px">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.toolbox}>
          <Typography className={classes.headerName}>jo's website</Typography>
          <IconButton edge="start" color="inherit" aria-label="sparkles">
            <img src={sparkles} alt="sparkles" className={classes.img} />
          </IconButton>
        </Box>
        <nav className={classes.nav}>
          <Link
            href="#home"
            color="inherit"
            underline="none"
            className={classes.link}
          >
            home 🪹
          </Link>
          <Link
            href="#about"
            color="inherit"
            underline="none"
            className={classes.link}
          >
            about me 🧍‍♀️
          </Link>
          <Link
            href="#projects"
            color="inherit"
            underline="none"
            className={classes.link}
          >
            my projects 🌻
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object,
};

export default Header;
