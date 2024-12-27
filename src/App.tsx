import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Blog, BlogPost } from "./pages/Blog";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import More from "./pages/More";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<More />} />
          <Route path="/blog/:index" element={<BlogPost />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
