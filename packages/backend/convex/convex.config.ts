// convex/convex.config.ts
import { defineApp } from "convex/server";
import cache from "@convex-dev/action-cache/convex.config";
import dodopayments from "@dodopayments/convex/convex.config";

const app = defineApp();
app.use(cache);
app.use(dodopayments);
// app.use(resend)

export default app;
