/**
 * Analytics module using PostHog's HTTP API directly.
 * This works in Convex's default runtime without needing Node.js APIs.
 */

import type { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server";

type ConvexCtx = ActionCtx | MutationCtx | QueryCtx;

/**
 * Get user ID from context
 */
async function getUserId(ctx: ConvexCtx): Promise<string | null> {
  try {
    const identity = await ctx.auth.getUserIdentity();
    return identity?.subject ?? null;
  } catch {
    return null;
  }
}

/**
 * Capture an event in PostHog using the HTTP API
 */
export async function captureEvent(
  ctx: ConvexCtx,
  eventName: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const host = process.env.POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    return;
  }

  try {
    const userId = await getUserId(ctx);
    const distinctId = userId ?? "anonymous";

    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        event: eventName,
        distinct_id: distinctId,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
          $lib: "convex",
        },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Silently fail analytics - don't break the app
    console.error("PostHog capture error:", error);
  }
}

/**
 * Identify a user in PostHog using the HTTP API
 */
export async function identifyUser(
  ctx: ConvexCtx,
  properties?: Record<string, unknown>,
): Promise<void> {
  const apiKey = process.env.POSTHOG_API_KEY;
  const host = process.env.POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    return;
  }

  try {
    const userId = await getUserId(ctx);
    if (!userId) {
      return;
    }

    await fetch(`${host}/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        event: "$identify",
        distinct_id: userId,
        properties: {
          $set: properties,
        },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Silently fail analytics - don't break the app
    console.error("PostHog identify error:", error);
  }
}
