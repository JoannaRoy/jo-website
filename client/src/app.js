import butterflies from "./assets/butterflies.svg";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import GermanLessons from "./components/GermanLessons";
import Footer from "./components/Footer";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App-home" id="home">
          <img src={butterflies} className="Butterflies" alt="butterflies" />
          <Typography>welcome!</Typography>
        </div>
        <Header />
        <div>
          <About />
        </div>
        <div className="Project-slides">
          <Projects />
        </div>
        <div>
          <GermanLessons />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: `"Courier New", Courier, monospace`,
  },
});

export default App;
