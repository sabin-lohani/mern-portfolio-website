import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(env.GOOGLE_CLIENT_ID),
      "process.env.GOOGLE_API_KEY": JSON.stringify(env.GOOGLE_API_KEY),
    },
    server: {
      proxy: {
        "/api": "http://localhost:8000",
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
