import crypto from "node:crypto";
import type { FastifyInstance } from "fastify";

import { db } from "../../database.js";
import { createTransactionSchema } from "./schemas.js";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const { title, amount, type } = createTransactionSchema.parse(request.body);

    const test = await db("transactions")
      .insert({
        id: crypto.randomUUID(),
        title: title,
        amount: amount * (type === "credit" ? 1 : -1),
        type: type,
      })
      .returning("*");

    return reply.status(201).send(test[0]);
  });
}
