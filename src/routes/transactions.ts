import type { FastifyInstance } from "fastify";
import { db } from "../database.js";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const test = await db("transactions")
      .insert({
        id: crypto.randomUUID(),
        title: "Test",
        amount: 1000,
      })
      .returning("*");

    return test;
  });
}
