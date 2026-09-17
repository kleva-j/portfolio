import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// The ThreeUI catalog component is vendored under src/shaders. These aliases let
// the configured usage import it through its published package specifier.
const threeuiEntry = fileURLToPath(
  new URL("./src/shaders/landing-pages/index.ts", import.meta.url),
)
const threeuiStyle = fileURLToPath(
  new URL("./src/shaders/threeui.css", import.meta.url),
)

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: "@designcodeio/threeui/style.css", replacement: threeuiStyle },
      { find: /^@designcodeio\/threeui$/, replacement: threeuiEntry },
    ],
  },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
