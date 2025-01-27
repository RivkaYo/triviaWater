import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      root: ".",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:2024",
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
    port: 5176,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${path.resolve(__dirname, "./src/style/colors.scss")}";`,
      },
    },
  },
});
