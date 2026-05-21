import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/oshi-clicker/",
  plugins: [react()],
  server: {
    host: true
  }
});
