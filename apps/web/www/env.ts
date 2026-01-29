import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_WEB_APP_URL: z.string().url().optional(),
    NEXT_PUBLIC_WEB_BLOG_URL: z.string().url().optional(),
    NEXT_PUBLIC_WEB_HELP_URL: z.string().url().optional(),
    NEXT_PUBLIC_WEB_STATUS_URL: z.string().url().optional(),
    NEXT_PUBLIC_DISCORD_URL: z.string().url().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WEB_APP_URL: process.env.NEXT_PUBLIC_WEB_APP_URL,
    NEXT_PUBLIC_WEB_BLOG_URL: process.env.NEXT_PUBLIC_WEB_BLOG_URL,
    NEXT_PUBLIC_WEB_HELP_URL: process.env.NEXT_PUBLIC_WEB_HELP_URL,
    NEXT_PUBLIC_WEB_STATUS_URL: process.env.NEXT_PUBLIC_WEB_STATUS_URL,
    NEXT_PUBLIC_DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL,
  },
});
