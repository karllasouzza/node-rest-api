import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .default("3000")
    .transform((value) => Number(value)),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(_env.error.format())}`,
  );
}

export const env = _env.data;
