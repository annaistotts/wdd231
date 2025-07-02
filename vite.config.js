import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

// This allows __dirname to work in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src/", // tells Vite to treat "src/" as the root

  build: {
    outDir: "../dist", // puts the built files one level up (outside of "src")
    emptyOutDir: true,  // clears the dist folder before building
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html") // entry point
      }
    }
  },

  server: {
    open: "/index.html" // opens your site automatically on dev server start
  }
});

