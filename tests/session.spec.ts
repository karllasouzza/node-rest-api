import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { checkSessionIdExists } from "../src/middlewares/check-session-id-exists.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../src/app.js";

describe("Session", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should check session Id exists", async () => {
    const request: FastifyRequest = {
      cookies: {
        sessionId: "test-session-id",
      },
    } as unknown as FastifyRequest;

    const reply: FastifyReply = {
      status: (code: number) => {
        console.log(`Status code: ${code}`);
        return reply;
      },
      send: (payload: unknown) => {
        console.log(`Response payload: ${JSON.stringify(payload)}`);
        return reply;
      },
    } as FastifyReply;

    const response = await checkSessionIdExists(request, reply);

    expect(response).toBeUndefined();
  });

  it("should return 401 when session Id does not exist", async () => {
    const request: FastifyRequest = {
      cookies: {},
    } as unknown as FastifyRequest;

    let statusCode: number | undefined;
    let responsePayload: unknown;

    const reply: FastifyReply = {
      status: (code: number) => {
        statusCode = code;
        return reply;
      },
      send: (payload: unknown) => {
        responsePayload = payload;
        return reply;
      },
    } as FastifyReply;

    await checkSessionIdExists(request, reply);

    expect(statusCode).toBe(401);
    expect(responsePayload).toEqual({ error: "Unauthorized" });
  });
});
