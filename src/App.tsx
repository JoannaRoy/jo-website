import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Blog } from "./pages/Blog/BlogHome";
import BlogPost from "./pages/Blog/BlogPost";
import BINJOHome from "./pages/BINJO/BINJOHome";
// import { Projects, ProjectSubPage } from "./pages/Projects";
// import Contact from "./pages/Contact";
// import More from "./pages/More";
// import NewYearsResolution from "./pages/NewYearsResolution";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:header/:title" element={<BlogPost />} />
          <Route path="/binjo" element={<BINJOHome />} />
          {/* <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:index" element={<ProjectSubPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<NewYearsResolution />} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
