import knex from "knex";
import type { Knex } from "knex";
import { env } from "./env/index.js";

const { DATABASE_CLIENT, DATABASE_URL } = env;

export const bdConfig: Knex.Config = {
  client: DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === "sqlite"
      ? {
          filename: DATABASE_URL,
        }
      : DATABASE_URL, // For PostgreSQL, the connection string is the DATABASE_URL
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
};

export const db = knex(bdConfig);
