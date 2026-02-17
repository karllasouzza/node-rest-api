import fastify from "fastify";
import { env } from "./env/index.js";

const app = fastify();

app.register(() =>
  import("./routes/transactions.js").then(
    async (module) => await module.transactionsRoutes(app),
  ),
);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}!`);
});
