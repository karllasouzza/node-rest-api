import knex from "knex";
import type { Knex } from "knex";

export const bdConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./database/db.sqlite",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations",
  },
};

export const db = knex(bdConfig);
