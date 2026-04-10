import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_matches", //module name
      filename: "remoteEntry.js", // file manifest contains map components
      exposes: {
        // Expose component to host calling
        "./MatchList": "./src/components/MatchList.tsx",
      },
      shared: ["react", "react-dom", "zustand", "@worldcup/shared-state"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    strictPort: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
});
