import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import "./styling/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import More from "./pages/More";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<More />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
