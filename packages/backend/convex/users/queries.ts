import { query } from "../_generated/server";
import { getCurrentUserOrThrow } from "./helpers";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUserOrThrow(ctx);
  },
});
