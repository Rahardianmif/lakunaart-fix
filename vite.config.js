import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/cleveland": {
        target: "https://openaccess-api.clevelandart.org/api",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/cleveland/, ""),
      },
    },
  },
});