import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    console.log(email, password);
    return c.json({ message: `${email} Logged in successfully` });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");
    console.log(name, email, password);
    return c.json({ message: `${name} Registered successfully` });
  });

export default app;
