import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/@types/**/*", // Exclude type definitions
        "src/server.ts", // Exclude server entry point (bootstrap only)
      ],
    },
  },
});
