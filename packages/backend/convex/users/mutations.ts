import { internalMutation } from "../_generated/server";
import { UserJSON } from "@clerk/backend";
import { ConvexError, v, Validator } from "convex/values";
import { getCurrentUserOrThrow, userByClerkId } from "./helpers";
import { captureEvent } from "../lib/analytics";

// "upsert" means to either update an existing record or insert a new one if the record doesn't exist
export const updateFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>, // no runtime validation, trust Clerk - (bad idea?)
  },
  handler: async (ctx, args) => {
    await captureEvent(ctx, "user_mutation_update_from_clerk", {
      clerkUserId: args.data.id,
    });
    const userAttributes = {
      name: `${args.data.first_name} ${args.data.last_name}`,
    };
    const user = await userByClerkId(ctx, args.data.id);
    if (!user) throw new Error("user doesn't exist");
    await ctx.db.patch(user._id, userAttributes);
  },
});

export const createFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>,
  },
  async handler(ctx, args) {
    await captureEvent(ctx, "user_mutation_create_from_clerk", {
      clerkUserId: args.data.id,
      email: args.data.email_addresses?.[0]?.email_address,
    });
    const userAttributes = {
      clerkId: args.data.id,
      name: `${args.data.first_name} ${args.data.last_name}`,
    };

    const insertedUserId = await ctx.db.insert("users", {
      details: "",
      summarySettings: "",
      ...userAttributes,
      credits: 100,
    });
    await ctx.db.insert("folders", {
      name: "Bookmarks",
      description: "My Bookmarks",
      type: "SYSTEM_CREATED_BOOKMARKS_FOLDER",
      userId: insertedUserId,
      content: "",
      public: false,
      paperExternalIds: [],
      searchIds: [],
    });
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, args) {
    await captureEvent(ctx, "user_mutation_delete_from_clerk", {
      clerkUserId: args.clerkUserId,
    });
    const user = await userByClerkId(ctx, args.clerkUserId);
    if (!user) throw new Error("user doesn't exist");
    await ctx.db.delete(user._id);
  },
});

export const deductCredits = internalMutation({
  args: {
    amount: v.number(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);

    if (user.credits < args.amount) {
      await captureEvent(ctx, "user_mutation_deduct_credits_failed", {
        amount: args.amount,
        currentCredits: user.credits,
        reason: "insufficient_credits",
      });
      throw new ConvexError("insufficient credits");
    }

    await captureEvent(ctx, "user_mutation_deduct_credits", {
      amount: args.amount,
      previousCredits: user.credits,
      newCredits: user.credits - args.amount,
    });

    await ctx.db.patch(user._id, {
      credits: user.credits - args.amount,
    });
  },
});

export const checkCredits = internalMutation({
  args: {
    amount: v.number(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);

    if (user.credits < args.amount) {
      await captureEvent(ctx, "user_mutation_check_credits_failed", {
        amount: args.amount,
        currentCredits: user.credits,
        reason: "insufficient_credits",
      });
      throw new ConvexError("insufficient credits");
    }

    await captureEvent(ctx, "user_mutation_check_credits", {
      amount: args.amount,
      currentCredits: user.credits,
      result: "sufficient",
    });

    return true;
  },
});

export const addCredits = internalMutation({
  args: {
    amount: v.number(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);

    await captureEvent(ctx, "user_mutation_add_credits", {
      amount: args.amount,
      previousCredits: user.credits,
      newCredits: user.credits + args.amount,
    });

    await ctx.db.patch(user._id, {
      credits: user.credits + args.amount,
    });

    return true;
  },
});

// Add credits by DodoPayments customer ID (for webhook handlers)
export const addCreditsByDodoCustomerId = internalMutation({
  args: {
    dodoCustomerId: v.string(),
    amount: v.number(),
  },
  async handler(ctx, args) {
    // Find user by dodoCustomerId using index
    const user = await ctx.db
      .query("users")
      .withIndex("byDodoCustomerId", (q) =>
        q.eq("dodoCustomerId", args.dodoCustomerId),
      )
      .first();

    if (!user) {
      console.warn(`User not found for dodoCustomerId: ${args.dodoCustomerId}`);
      return false;
    }

    await ctx.db.patch(user._id, {
      credits: user.credits + args.amount,
    });

    return true;
  },
});

// Update user's dodoCustomerId (for webhook handlers)
export const updateDodoCustomerId = internalMutation({
  args: {
    dodoCustomerId: v.string(),
    customerEmail: v.string(),
  },
  async handler(ctx, args) {
    // Try to find user by dodoCustomerId first
    let user = await ctx.db
      .query("users")
      .withIndex("byDodoCustomerId", (q) =>
        q.eq("dodoCustomerId", args.dodoCustomerId),
      )
      .first();

    // If not found, we need to match by email or other identifier
    // Since we don't store email in users table, we'll need to rely on
    // the payment record or other matching logic
    // For now, if user already has dodoCustomerId, we're done
    if (user) {
      return user._id;
    }

    // Note: In a production app, you might want to match users by email
    // stored in the identity or payment records. For now, we'll link
    // the dodoCustomerId when we can match it through other means.
    return null;
  },
});

export const resetAllCredits = internalMutation({
  async handler(ctx) {
    const users = await ctx.db.query("users").collect();
    let resetCount = 0;
    for (const user of users) {
      if (user.credits < 100) {
        // throw new Error("supposed to send notification here, but implementation not present")
        await ctx.db.patch(user._id, { credits: 100 });
        resetCount++;
        // await notifications.workflows.trigger('workflow-key', {
        //   recipients: [{
        //     id: user._id,
        //     email: 'user-email',
        //   }],
        //   data: {
        //     message: 'Your credits have been reset to 100.',
        //   },
        // });
      }
    }
    await captureEvent(ctx, "user_mutation_reset_all_credits", {
      totalUsers: users.length,
      usersReset: resetCount,
    });
  },
});
