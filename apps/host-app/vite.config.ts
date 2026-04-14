import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
// loadEnv: đọc file .env tương ứng với mode (development/production)
export default defineConfig(({ mode }) => {
  // Phải dùng loadEnv vì process.env không hoạt động trực tiếp trong vite.config
  // '' = prefix rỗng → load tất cả env vars (kể cả không có VITE_ prefix)
  const env = loadEnv(mode, process.cwd(), '');

  console.log('--- CI BUILD DEBUG ---');
  console.log('VITE_REMOTE_MATCHES_URL:', env.VITE_REMOTE_MATCHES_URL);
  console.log('VITE_REMOTE_LIVE_URL:', env.VITE_REMOTE_LIVE_URL);
  console.log('-----------------------');

  const matchesUrl = env.VITE_REMOTE_MATCHES_URL || "http://localhost:5001/assets/remoteEntry.js";
  const liveUrl = env.VITE_REMOTE_LIVE_URL || "http://localhost:5002/assets/remoteEntry.js";

  return {
    plugins: [
      react(),
      federation({
        name: "host_app",
        remotes: {
          remote_matches: matchesUrl,
          remote_live: liveUrl,
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
