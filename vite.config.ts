import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), nodePolyfills()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...(mode === "development" && {
        "react-binjo": path.resolve(__dirname, "../react-binjo/src"),
      }),
    },
  },
  build: {
    assetsDir: "assets",
  },
}));
