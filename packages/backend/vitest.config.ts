import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "_generated/**",
        "**/*.config.ts",
        "__tests__/**",
      ],
    },
    include: ["__tests__/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./convex",
      ),
    },
  },
});
