"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useUser } from "@clerk/nextjs";
import { env } from "@/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const { user } = useUser();
  // useEffect(() => {
  //   // Initialize PostHog only if keys are provided
  //   if (
  //     typeof window !== "undefined" &&
  //     env.NEXT_PUBLIC_POSTHOG_KEY &&
  //     env.NEXT_PUBLIC_POSTHOG_HOST
  //   ) {
  //     posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  //       api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  //       // Enable debug mode in development
  //       loaded: (posthog) => {
  //         if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
  //       },
  //       // Disable automatic pageview tracking - we'll track manually for Next.js App Router
  //       capture_pageview: false,
  //       // Capture pageleaves
  //       capture_pageleave: true,
  //     });
  //   }
  // }, []);
  // // Identify user when they log in
  // useEffect(() => {
  //   if (user && env.NEXT_PUBLIC_POSTHOG_KEY) {
  //     posthog.identify(user.id, {
  //       email: user.primaryEmailAddress?.emailAddress,
  //       name: user.fullName,
  //     });
  //   } else if (!user && env.NEXT_PUBLIC_POSTHOG_KEY) {
  //     posthog.reset(); // Reset when user logs out
  //   }
  // }, [user]);
  // // Track pageviews
  // useEffect(() => {
  //   if (pathname && env.NEXT_PUBLIC_POSTHOG_KEY) {
  //     let url = window.origin + pathname;
  //     if (searchParams && searchParams.toString()) {
  //       url = url + `?${searchParams.toString()}`;
  //     }
  //     posthog.capture("$pageview", {
  //       $current_url: url,
  //     });
  //   }
  // }, [pathname, searchParams]);
  // return <>{children}</>;
}
