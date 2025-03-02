import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
// import { Projects, ProjectSubPage } from "./pages/Projects";
// import Contact from "./pages/Contact";
// import More from "./pages/More";
// import NewYearsResolution from "./pages/NewYearsResolution";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
