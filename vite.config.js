import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root,
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        work: resolve(root, "work.html"),
        about: resolve(root, "about.html"),
        contact: resolve(root, "contact.html"),
        insomnus: resolve(root, "work/insomnus.html"),
        mintpark: resolve(root, "work/mintpark.html"),
        ordinals: resolve(root, "work/ordinals.html"),
        somegorillas: resolve(root, "work/somegorillas.html"),
        somnia: resolve(root, "work/somnia.html"),
        megaeth: resolve(root, "work/megaeth.html"),
      },
    },
  },
});
