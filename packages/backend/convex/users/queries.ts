import { query } from "../_generated/server";
import { getCurrentUserOrThrow } from "./helpers";
import { captureEvent } from "../lib/posthog";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    await captureEvent(ctx, "user_query_get_current_user", {});
    return await getCurrentUserOrThrow(ctx);
  },
});
