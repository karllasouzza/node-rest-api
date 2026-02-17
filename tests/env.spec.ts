import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { env } from "../src/env/index.js";
import { app } from "../src/app.js";

describe("environment", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should have the necessary environment variables", () => {
    expect(env).toHaveProperty("DATABASE_URL");
    expect(env).toHaveProperty("PORT");
  });

  it("should have the correct NODE_ENV value", () => {
    expect(env.NODE_ENV).toBeOneOf(["development", "production", "test"]);
  });
});
