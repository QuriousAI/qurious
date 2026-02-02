// convex/dodo.ts
import { DodoPayments, DodoPaymentsClientConfig } from "@dodopayments/convex";
import { components } from "./_generated/api";
import { internal } from "./_generated/api";

export const dodo = new DodoPayments(components.dodopayments, {
  identify: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.log("User is not logged in");
      return null; // User is not logged in
    }

    // Use ctx.runQuery() to lookup customer from your database
    const customer = await ctx.runQuery(internal.users.queries.getByAuthId, {
      authId: identity.subject,
    });

    if (!customer) {
      console.log("Customer not found in database");
      return null; // Customer not found in database
    }

    console.log("Customer found in database", customer);

    return {
      dodoCustomerId: customer.dodoCustomerId, // Field storing Dodo Payments customer ID
    };
  },
  apiKey: process.env.DODO_PAYMENTS_API_KEY!,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as
    | "test_mode"
    | "live_mode",
} as DodoPaymentsClientConfig);
