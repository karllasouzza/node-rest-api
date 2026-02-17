import { config } from "dotenv";
import { envSchema } from "./schema.js";

// Coverage: The else branch is not covered because tests always run with NODE_ENV=test
/* v8 ignore if -- @preserve */
if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
  console.log(process.env.DATABASE_URL);
} else if (process.env.NODE_ENV === "production") {
  config({ path: ".env.local" });
} else {
  config();
}

const _env = envSchema.safeParse(process.env);

// Coverage: This error throw is not covered because it only happens with invalid env vars
/* v8 ignore if -- @preserve */
if (!_env.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(_env.error.format())}`,
  );
}

export const env = _env.data;
