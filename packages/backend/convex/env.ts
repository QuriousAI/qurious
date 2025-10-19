"use node";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envVariables = createEnv({
  server: {
    // Convex
    CONVEX_DEPLOYMENT: z.string(),
    CONVEX_URL: z.string().startsWith("https://").endsWith(".convex.cloud"),

    // Clerk
    CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
    CLERK_ISSUER_URL: z
      .string()
      .startsWith("https://")
      .endsWith(".clerk.accounts.dev"),

    // Dodo Payments
    DODO_PAYMENTS_WEBHOOK_SECRET: z.string().startsWith("whsec_"),

    // Google Generative AI
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().startsWith("AI"),
  },
  runtimeEnv: process.env,
});

// export const envVariables = z.object({
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
