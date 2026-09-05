import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    // No allowedHosts here on purpose. Vite's default Host check already accepts localhost
    // and IP literals; a blanket allow would let a hostile page resolve its own name to
    // 127.0.0.1 and drive this dev server through the victim's browser (DNS rebinding).
    fs: {
      // Refuse to serve anything outside the workspace root, so a path-traversal bug in the
      // dev server cannot hand a drive-by page files from elsewhere on the machine.
      strict: true,
    },
  },
  // Build only. Vite's esbuild transform runs in dev too, so an unconditional drop would
  // delete the DEV-guarded console.assert self-checks in src/lib/devices.ts and
  // src/lib/useCarousel.ts, silently turning them into no-ops instead of failing loudly.
  esbuild: command === "build" ? { drop: ["console", "debugger"] } : undefined,
}))
