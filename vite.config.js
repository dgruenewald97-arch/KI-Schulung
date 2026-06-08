import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// base: Beim Build für GitHub Pages müssen die Asset-Pfade auf den
// Repo-Namen zeigen (https://<user>.github.io/KI-Schulung/).
// Lokal (npm run dev) bleibt es bei "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/KI-Schulung/" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}));
