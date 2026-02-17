import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import supertest from "supertest";
import { app } from "../src/app.js";
import { execSync } from "node:child_process";

describe.only("transaction", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync("yarn knex -- migrate:rollback --all");
    execSync("yarn knex -- migrate:latest");
  });

  it("should create a new transaction", async () => {
    const response = await supertest(app.server).post("/transactions").send({
      title: "New Transaction",
      amount: 100,
      type: "credit",
    });

    expect(response.status).toBe(201);
  });

  it("should get the summary of transactions", async () => {
    const createResponse = await supertest(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 100,
        type: "credit",
      });

    const cookies = createResponse.get("Set-Cookie") || [];

    await supertest(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 50,
        type: "debit",
      })
      .set("Cookie", cookies);

    const response = await supertest(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("balance", 50);
  });

  it("should get the list of transactions", async () => {
    const createResponse = await supertest(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 100,
        type: "credit",
      });

    const cookies = createResponse.get("Set-Cookie") || [];
    const response = await supertest(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("transactions");
    expect(response.body).toHaveProperty("total");
    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: "New Transaction",
        amount: 100,
        type: "credit",
      }),
    ]);
  });

  it("should get a single transaction", async () => {
    const createResponse = await supertest(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 100,
        type: "credit",
      });

    const cookies = createResponse.get("Set-Cookie") || [];
    const transactionId = createResponse.body.id;

    const response = await supertest(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", transactionId);
  });
});
