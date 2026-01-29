// convex/convex.config.ts
import { defineApp } from "convex/server";
import cache from "@convex-dev/action-cache/convex.config";
import resend from "@convex-dev/resend/convex.config";
import dodopayments from "@dodopayments/convex/convex.config";
import posthog from "@samhoque/convex-posthog/convex.config";

const app = defineApp();
app.use(cache);
app.use(dodopayments);
app.use(resend);
app.use(posthog);

export default app;
