import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],

  test: {
    environment: "jsdom",
    exclude: ["src/tests/e2e/*", "tests-examples/*"],
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@acme/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@acme/live-form": path.resolve(
        __dirname,
        "../../packages/live-form/src",
      ),
    },
  },
});
