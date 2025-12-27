import { Hono } from "hono";
import { unkey, UnkeyContext } from "@unkey/hono";

// const app = new Hono();
const app = new Hono<{ Variables: { unkey: UnkeyContext } }>();

app.use("*", unkey({rootKey:"Umm - what's supposed to go here?"}));

app.get("/", (c) => c.text("Welcome to Qurious' Public API-Pre-Alpha"));

export default app;
