"use client";

import React from "react";
import { SidebarTrigger } from "@workspace/ui/src/components/sidebar";
import { Cmdk } from "./cmdk";
import { ModeToggle } from "./mode-toggle";
import { HeaderBreadcrumb } from "./breadcrumb";
import { Help } from "./help";

export const Header = () => {
  return (
    <header className="relative flex items-center justify-between py-1 px-2">
      <SidebarTrigger />
      <HeaderBreadcrumb className="absolute left-1/2 -translate-x-1/2 truncate" />
      <div className="flex items-center justify-center gap-4">
        <Cmdk />
        <Help />
        <ModeToggle />
      </div>
    </header>
  );
};
