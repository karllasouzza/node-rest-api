import crypto from "node:crypto";
import type { FastifyInstance } from "fastify";

import { db } from "../../database.js";
import {
  createTransactionSchema,
  getTransactionParamsSchema,
} from "./schemas.js";

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

  app.get("/", async (_, reply) => {
    const transactions = await db("transactions").select("*");
    return reply.status(200).send({ total: transactions.length, transactions });
  });

  app.get("/:id", async (request, reply) => {
    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await db("transactions").where({ id }).first("*");

    if (!transaction) {
      return reply.status(404).send({ message: "Transaction not found" });
    }

    return reply.status(200).send(transaction);
  });
}
