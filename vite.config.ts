import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
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
    rollupOptions: {
      external: [
        'redis',
        '@redis/client',
        '@redis/bloom',
        '@redis/json',
        '@redis/search',
        '@redis/time-series'
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'redis',
      '@redis/client',
      '@redis/bloom',
      '@redis/json',
      '@redis/search',
      '@redis/time-series'
    ]
  }
}));
