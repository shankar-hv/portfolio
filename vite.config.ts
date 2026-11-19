import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset paths so the site works on GitHub Pages under any repo name.
  base: "./",
  plugins: [react(), tailwindcss()],
});
