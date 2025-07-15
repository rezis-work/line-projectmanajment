import { Hono } from "hono";
import { handle } from "hono/vercel";
import authRoutes from "@/features/auth/server/route";
import workspaceRoutes from "@/features/workspaces/server/route";
import memberRoutes from "@/features/members/server/route";
import projectRoutes from "@/features/projects/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", authRoutes)
  .route("/workspaces", workspaceRoutes)
  .route("/members", memberRoutes)
  .route("/projects", projectRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
