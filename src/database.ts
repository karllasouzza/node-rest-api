import knex from "knex";
import type { Knex } from "knex";
import { env } from "./env/index.js";

const { DATABASE_CLIENT, DATABASE_URL } = env;

export const bdConfig: Knex.Config = {
  client: DATABASE_CLIENT,
  connection: {
    filename: DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
};

export const db = knex(bdConfig);
