import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoutes from "@/features/auth/server/route";
import workspaceRoutes from "@/features/workspaces/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", authRoutes)
  .route("/workspaces", workspaceRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
