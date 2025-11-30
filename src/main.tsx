import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styling/index.css";
import App from "./App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import BlogPost from "./pages/blog/BlogPost";
import BINJOHome from "./pages/BINJO/BINJOHome";
import Blog from "./pages/blog/BlogHome";
import { ReactFlowProvider } from "reactflow";
import Flow from "./pages/mind_map/Flow";

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
      {
        path: "mind-map",
        element: <Flow />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <RouterProvider router={router} />
    </ReactFlowProvider>
  </StrictMode>
);
