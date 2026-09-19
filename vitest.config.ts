import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.spec.ts"],
    environment: "node",
    // Affiche chaque `it`, groupé par fichier puis par `describe`.
    reporters: ["tree"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      // Modules purement typés : ils s'effacent à la compilation.
      exclude: ["src/interfaces/**"],
    },
  },
});
