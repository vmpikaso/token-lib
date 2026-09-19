import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.spec.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      // Modules purement typés : ils s'effacent à la compilation.
      exclude: ["src/interfaces/token.ts", "src/interfaces/token-global.ts", "src/interfaces/token-contructor.ts"],
    },
  },
});
