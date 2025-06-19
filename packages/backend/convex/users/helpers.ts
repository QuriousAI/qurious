import { QueryCtx } from "../_generated/server";

export async function getCurrentUserEmailOrThrow(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new Error("No identity found");
  }

  if (!identity.email) {
    throw new Error("No email found");
  }

  return identity.email;
}

export async function getCurrentUserIdOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUserOrThrow(ctx);
  return userRecord._id;
}

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const currentUser = await getCurrentUser(ctx);
  if (!currentUser) throw new Error("Can't get current user!");
  return currentUser;
}

async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) return null;

  const user = await userByClerkId(ctx, identity.subject);
  if (user === null) {
    throw new Error(
      "User auth identity present, but user not found in backend."
    );
  }

  return user;
}

export async function userByClerkId(ctx: QueryCtx, clerkId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
}
