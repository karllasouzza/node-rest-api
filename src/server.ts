import fastify from "fastify";
import { env } from "./env/index.js";
import { transactionsRoutes } from "./routes/transactions/index.js";

const app = fastify();
app.register(import("@fastify/cookie"));

app.register(transactionsRoutes, {
  prefix: "/transactions",
});

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}!`);
});
