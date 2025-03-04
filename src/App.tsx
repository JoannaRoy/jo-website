import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
// import { Projects, ProjectSubPage } from "./pages/Projects";
// import Contact from "./pages/Contact";
// import More from "./pages/More";
// import NewYearsResolution from "./pages/NewYearsResolution";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
