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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ReactFlowProvider>
    <Analytics />
  </StrictMode>
);
