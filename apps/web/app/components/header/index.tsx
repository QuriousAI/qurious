"use client";

import React from "react";
import { SidebarTrigger } from "@workspace/design-system/components/sidebar";
import { Cmdk } from "./cmdk";
import { ModeToggle } from "./mode-toggle";
import { HeaderBreadcrumb } from "./breadcrumb";
import { Help } from "./help";

export const Header = () => {
  return (
    <header className="relative flex items-center justify-between pt-1 px-2">
      <SidebarTrigger />
      <HeaderBreadcrumb className="absolute left-1/2 -translate-x-1/2 truncate bg-background   self-end rounded-t-2xl border-t px-8 py-3 flex items-center border-x translate-y-[2px] z-100" />
      <HeaderBreadcrumb className="absolute left-1/2 -translate-x-1/2 truncate  self-end rounded-t-2xl border-t px-8 py-3 flex items-center border-x translate-y-[2px] z-100" />
      <div className="flex items-center justify-center gap-4">
        <Cmdk />
        <Help />
        <ModeToggle />
        {/* <Notification /> */}
      </div>
    </header>
  );
};
