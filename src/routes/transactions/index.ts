import crypto from "node:crypto";
import type { FastifyInstance } from "fastify";

import { db } from "../../database.js";
import {
  createTransactionSchema,
  getTransactionParamsSchema,
} from "./schemas.js";
import { checkSessionIdExists } from "../../middlewares/check-session-id-exists.js";

export async function transactionsRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const result = createTransactionSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ message: "Invalid request body" });
    }

    const { title, amount, type } = result.data;

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    const test = await db("transactions")
      .insert({
        id: crypto.randomUUID(),
        title: title,
        amount: amount * (type === "credit" ? 1 : -1),
        type: type,
        session_id: sessionId,
      })
      .returning("*");

    return reply.status(201).send(test[0]);
  });

  app.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const transactions = await db("transactions")
        .where({ session_id: sessionId })
        .select("*");

      return reply
        .status(200)
        .send({ total: transactions.length, transactions });
    },
  );

  app.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const result = getTransactionParamsSchema.safeParse(request.params);

      if (!result.success) {
        return reply.status(404).send({ message: "Transaction not found" });
      }

      const { id } = result.data;
      const { sessionId } = request.cookies;

      const transaction = await db("transactions")
        .where({ id, session_id: sessionId })
        .first("*");

      if (!transaction) {
        return reply.status(404).send({ message: "Transaction not found" });
      }

      return reply.status(200).send(transaction);
    },
  );

  app.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const sumary = await db("transactions")
        .where({ session_id: sessionId })
        .sum("amount", { as: "balance" })
        .first();

      return reply.status(200).send(sumary);
    },
  );
}
