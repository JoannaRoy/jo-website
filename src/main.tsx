import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styling/index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import App from "@/App.tsx";
import BINJOHome2026 from "@/pages/BINJO/BINJOHome2026";
import BINJOArchive from "@/pages/BINJO/binjo_archive/BINJOArchive";
import Blog from "@/pages/blog/BlogHome.tsx";
import BlogPost from "@/pages/blog/BlogPost.tsx";
import Home from "@/pages/Home.tsx";
import Flow from "@/pages/mind_map/Flow.tsx";
import TipsForMoving from "@/pages/TipsForMoving";


const router = createBrowserRouter([
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
        element: <BINJOHome2026 />,
      },
      {
        path: "binjo-archive/:year?",
        element: <BINJOArchive />,
      },
      {
        path: "mind-map",
        element: <Flow />,
      },
      {
        path: "tips-for-moving",
        element: <TipsForMoving />,
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

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <ReactFlowProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ReactFlowProvider>
    <Analytics />
  </StrictMode>
);
