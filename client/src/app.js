import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import butterflies from "./assets/butterflies.svg";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import GermanTeacher from "./components/GermanTeacher";
import GermanVocab from "./components/german_lessons/GermanVocab";
import GermanCases from "./components/german_lessons/GermanCases";
import Footer from "./components/Footer";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div className="App-home" id="home">
                  <img
                    src={butterflies}
                    className="Butterflies"
                    alt="butterflies"
                  />
                  <Typography>welcome!</Typography>
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/german" element={<GermanTeacher />} />
            <Route
              path="/german_lessons/GermanVocab"
              element={<GermanVocab />}
            />
            <Route
              path="/german_lessons/GermanCases"
              element={<GermanCases />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: `"Courier New", Courier, monospace`,
  },
});

export default App;
