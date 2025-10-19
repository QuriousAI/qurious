import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Qurious' Public API-Pre-Alpha"));

export default app;
