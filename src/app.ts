import fastify from "fastify";
import { transactionsRoutes } from "./routes/transactions/index.js";

export const app = fastify();
app.register(import("@fastify/cookie"));

app.register(transactionsRoutes, {
  prefix: "/transactions",
});
