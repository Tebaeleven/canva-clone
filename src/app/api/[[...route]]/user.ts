import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get("/", (c) => {
    return c.json({ user: "GET" });
  })
  .get("/:name", zValidator("param", z.object({ name: z.number() })), (c) => {
    const params = c.req.valid("param");

    return c.json({ user: params.name });
  });

export default app;
