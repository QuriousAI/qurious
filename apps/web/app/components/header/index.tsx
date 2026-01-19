"use client";

import React from "react";
import { SidebarTrigger } from "@workspace/design-system/components/sidebar";
import { Cmdk } from "./cmdk";
import { ModeToggle } from "./mode-toggle";
import { FontToggle } from "./font-toggle";
import { HeaderBreadcrumb } from "./breadcrumb";
import { Help } from "./help";
import { motion } from "motion/react";

export const Header = () => {
  return (
    <motion.header
      className="relative flex items-center justify-between pt-1 px-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <SidebarTrigger />
      </motion.div>
      <HeaderBreadcrumb className="absolute left-1/2 -translate-x-1/2 overflow-hidden" />
      <div className="items-center justify-center gap-4 hidden md:flex">
        <Cmdk />
        <Help />
        <FontToggle />
        <ModeToggle />
      </div>
    </motion.header>
  );
};
