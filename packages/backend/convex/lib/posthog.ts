"use node";

import { PostHog } from "posthog-node";
import type { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Get user ID from context
 */
async function getUserId(
  ctx: ActionCtx | MutationCtx | QueryCtx,
): Promise<string | null> {
  try {
    const identity = await ctx.auth.getUserIdentity();
    return identity?.subject ?? null;
  } catch {
    return null;
  }
}

/**
 * Create a PostHog client instance
 * For serverless environments, we create a new client per request
 * and flush immediately
 */
function createPostHogClient(): PostHog | null {
  const apiKey = process.env.POSTHOG_API_KEY;
  const host = process.env.POSTHOG_HOST || "https://us.i.posthog.com";

  if (!apiKey) {
    return null;
  }

  return new PostHog(apiKey, {
    host,
    // Flush immediately for serverless environments
    flushAt: 1,
    flushInterval: 0,
  });
}

/**
 * Capture an event in PostHog
 */
export async function captureEvent(
  ctx: ActionCtx | MutationCtx | QueryCtx,
  eventName: string,
  properties?: Record<string, any>,
): Promise<void> {
  const client = createPostHogClient();
  if (!client) {
    return;
  }

  try {
    const userId = await getUserId(ctx);
    const distinctId = userId ?? "anonymous";

    client.capture({
      distinctId,
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });

    // Flush and shutdown for serverless
    await client.shutdown();
  } catch (error) {
    // Silently fail analytics - don't break the app
    console.error("PostHog capture error:", error);
  }
}

/**
 * Identify a user in PostHog
 */
export async function identifyUser(
  ctx: ActionCtx | MutationCtx | QueryCtx,
  properties?: Record<string, any>,
): Promise<void> {
  const client = createPostHogClient();
  if (!client) {
    return;
  }

  try {
    const userId = await getUserId(ctx);
    if (!userId) {
      return;
    }

    client.identify({
      distinctId: userId,
      properties,
    });

    // Flush and shutdown for serverless
    await client.shutdown();
  } catch (error) {
    // Silently fail analytics - don't break the app
    console.error("PostHog identify error:", error);
  }
}
