import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styling/index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import BlogPost from "./pages/Blog/BlogPost.tsx";
import BINJOHome from "./pages/BINJO/BINJOHome.tsx";
import Blog from "./pages/Blog/BlogHome.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:header/:title",
        element: <BlogPost />,
      },
      {
        path: "binjo",
        element: <BINJOHome />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
