import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
