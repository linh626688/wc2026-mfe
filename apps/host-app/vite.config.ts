import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
// loadEnv: đọc file .env tương ứng với mode (development/production)
export default defineConfig(({ mode }) => {
  // Phải dùng loadEnv vì process.env không hoạt động trực tiếp trong vite.config
  // '' = prefix rỗng → load tất cả env vars (kể cả không có VITE_ prefix)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: "host_app",
        remotes: {
          // Dùng env var thay vì hardcode
          // Fallback về localhost cho local development
          remote_matches: env.VITE_REMOTE_MATCHES_URL
            || "http://localhost:5001/assets/remoteEntry.js",
          remote_live: env.VITE_REMOTE_LIVE_URL
            || "http://localhost:5002/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom", "react-router-dom", "zustand", "@worldcup/shared-state"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
    },
  };
});
