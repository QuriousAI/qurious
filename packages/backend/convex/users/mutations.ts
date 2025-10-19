import { internalMutation } from "../_generated/server";
import { UserJSON } from "@clerk/backend";
import { ConvexError, v, Validator } from "convex/values";
import { getCurrentUserOrThrow, userByClerkId } from "./helpers";

// "upsert" means to either update an existing record or insert a new one if the record doesn't exist
export const updateFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>, // no runtime validation, trust Clerk - (bad idea?)
  },
  handler: async (ctx, args) => {
    const userAttributes = {
      name: `${args.data.first_name} ${args.data.last_name}`,
    };
    const user = await userByClerkId(ctx, args.data.id);
    if (!user) throw new Error("user doesnt exist");
    await ctx.db.patch(user._id, userAttributes);
  },
});

export const createFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>,
  },
  async handler(ctx, args) {
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
    const user = await userByClerkId(ctx, args.clerkUserId);
    if (!user) throw new Error("user doesnt exist");
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
      throw new ConvexError("insufficient credits");
    }

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
      throw new ConvexError("insufficient credits");
    }

    return true;
  },
});

export const addCredits = internalMutation({
  args: {
    amount: v.number(),

  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);

    ctx.db.patch(user._id, {
      credits: user.credits + args.amount
    })

    

    return true;
  },
})

export const resetAllCredits = internalMutation({
  async handler(ctx) {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      if (user.credits < 100) {
        throw new Error("supposed to send notification here, but implementation not present")
        await ctx.db.patch(user._id, { credits: 100 });
        await notifications.workflows.trigger('workflow-key', {
          recipients: [{
            id: user._id,
            email: 'user-email',
          }],
          data: {
            message: 'Your credits have been reset to 100.',
          },
        });
      }
    }
  },
});


