import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styling/index.css";
import App from "@/App.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import BlogPost from "@/pages/blog/BlogPost.tsx";
import BINJOHome from "@/pages/BINJO/BINJOHome.tsx";
import Blog from "@/pages/blog/BlogHome.tsx";
import { ReactFlowProvider } from "reactflow";
import Flow from "@/pages/mind_map/Flow.tsx";
import { Analytics } from "@vercel/analytics/react";

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
    <Analytics />
  </StrictMode>
);
