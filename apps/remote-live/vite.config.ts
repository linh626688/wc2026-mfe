import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remote_live",
      filename: "remoteEntry.js",
      exposes: {
        // QUAN TRỌNG: Expose main.ts để chạy logic đăng ký Custom Element
        "./LiveScore": "./src/main.ts",
      },
      shared: [],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5002,
    strictPort: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
  },
});
