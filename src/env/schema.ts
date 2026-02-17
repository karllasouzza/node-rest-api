import z from "zod";

export const envSchema = z.object({
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
