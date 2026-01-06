"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@workspace/design-system/components/sidebar";
import Link from "next/link";
import { APP_NAME } from "@workspace/design-system/content";
import {
  Folders,
  Search,
  BadgeCheck,
  LogIn,
  SquareArrowOutUpRight,
  Discord,
  Home,
  AppLogo,
} from "@workspace/design-system/icons";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@workspace/design-system/components/button";
import { APP_CONTENT } from "@workspace/design-system/content";
import { SidebarMenuItem_UserDropwn } from "./auth-header";
import { SearchGroup } from "./authenticated";
import { Skeleton } from "@workspace/design-system/components/skeleton";

const SearchGroupSkeleton = () => {
  return (
    <div className="px-4 flex flex-col gap-4 opacity-25">
      <Skeleton className="h-6 w-1/3 " />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/10" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/10" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/10" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/10" />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/10" />
        </div>
      </div>
    </div>
  );
};

const FeaturesList = () => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {APP_CONTENT.unautheticatedSidebar.features.map((feature, i) => (
        <div key={i} className="flex items-center gap-2">
          <BadgeCheck className="shrink-0 text-green-400" />
          <div>{feature}</div>
        </div>
      ))}
    </div>
  );
};

const AdForQurious = () => (
  <div className="flex flex-col justify-center gap-6 px-6 h-full">
    <div className="flex flex-col gap-2 items-center">
      <div className="text-4xl leading-tight font-bold">
        {APP_CONTENT.unautheticatedSidebar.title}
      </div>
      <div className="text-2xl leading-tight font-semibold">
        {APP_CONTENT.unautheticatedSidebar.lead}
      </div>
    </div>
    <FeaturesList />

    <SignUpButton>
      <Button className="">
        {APP_CONTENT.unautheticatedSidebar.signUpButton} <LogIn />
      </Button>
    </SignUpButton>
  </div>
);

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="pr-0">
      <SidebarHeader>
        <Authenticated>
          <SidebarMenu>
            <SidebarMenuItem_UserDropwn />
            <SidebarMenuItem>
              <SidebarMenuButton
                className="rounded-sm px-4"
                asChild
                // variant="outline"
              >
                <Link href="/" className="flex font-medium">
                  <Home /> Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="rounded-sm px-4"
                // variant="outline"
                asChild
              >
                <Link href="/folders" className="flex font-medium">
                  <Folders /> Folders
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Authenticated>

        <AuthLoading>
          <div className="py-4 opacity-25">
            <Skeleton className="h-12 w-full py-6" />
            <div className="px-4 flex flex-col gap-2 py-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </AuthLoading>
      </SidebarHeader>

      <SidebarContent className="no-scrollbar">
        <Authenticated>
          <SearchGroup />
        </Authenticated>
        <Unauthenticated>
          <AdForQurious />
        </Unauthenticated>
        <AuthLoading>
          <SearchGroupSkeleton />
        </AuthLoading>
      </SidebarContent>

      <SidebarFooter className="px-0">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="border bg-background py-5 rounded-lg text-base flex justify-center hover:text-white hover:cursor-pointer hover:bg-card font-semibold"
            >
              <Link
                className="flex justify-center items-center gap-1"
                href="https://discord.gg/2a346Rf7me"
              >
                <Discord className="size-5" /> Join the Discord!
                <SquareArrowOutUpRight className="ml-1 size-5" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
