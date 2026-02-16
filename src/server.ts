import fastify from "fastify";
import { db } from "./database.js";

const app = fastify();

app.get("/", async () => {
  const test = await db("sqlite_schema").select("*");
  return test;
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running!");
});
