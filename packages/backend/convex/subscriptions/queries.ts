import { query } from "../_generated/server";
import { getCurrentUserEmailOrThrow } from "../users/helpers";

export const getSubscription = query({
  args: {},
  handler: async (ctx) => {
    const email = await getCurrentUserEmailOrThrow(ctx);

    const subscription = await ctx.db
      .query("subscriptions")
      .filter((q) => q.eq(q.field("customerEmail"), email))
      .first();

    return subscription;
  },
});
