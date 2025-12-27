// convex/convex.config.ts
import { defineApp } from "convex/server";
import cache from "@convex-dev/action-cache/convex.config";
import { z } from "zod";


// throw new Error("can't initlaize app until dodopayments compoennt is installed.")
// throw new Error("integrate notification system")




const app = defineApp()
app.use(cache)
// app.use(dodopayments)
// app.use(resend)



// const envVariables = z.object({
//   // Convex
//   CONVEX_DEPLOYMENT: z.string(),
//   CONVEX_URL: z.string().startsWith("https://").endsWith(".convex.cloud"),

//   // Clerk
//   CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
//   CLERK_ISSUER_URL: z
//     .string()
//     .startsWith("https://")
//     .endsWith(".clerk.accounts.dev"),

//   // Dodo Payments
//   DODO_PAYMENTS_WEBHOOK_SECRET: z.string().startsWith("whsec_"),

//   // Google Generative AI
//   GOOGLE_GENERATIVE_AI_API_KEY: z.string().startsWith("AI"),
// });

// envVariables.parse(process.env);

export default app;
