import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ConsentBanner from "@/components/consent-banner";
import Footer from "@/components/footer";
import NavBar from "@/components/navigation-bar";

function ScrollToHash() {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace(/^#/, ""));
    let attempt = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }

      attempt += 1;
      if (attempt < 20) {
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, [hash]);

  return null;
}

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <ScrollToHash />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
};

export default App;
