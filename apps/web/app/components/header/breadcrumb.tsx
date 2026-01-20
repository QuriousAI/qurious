"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/design-system/components/breadcrumb";
import {
  SlashIcon,
  Home,
  File,
  Folders,
  Settings,
  Search,
  User,
  Palette,
  CreditCard,
} from "@workspace/design-system/icons";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

const SlashBreadcrumbSeparator = () => {
  return (
    <BreadcrumbSeparator>
      <SlashIcon />
    </BreadcrumbSeparator>
  );
};

const SEGMENT_ICON_MAPPING = {
  folders: <Folders className="size-4" />,
  papers: <File className="size-4" />,
  search: <Search className="size-4" />,
};

export const HeaderBreadcrumb = (props: { className: string }) => {
  const pathname = usePathname();
  let breadcrumbItems = [
    <BreadcrumbItem>
      <BreadcrumbPage className="flex items-center gap-2 capitalize">
        <Home className="size-4" /> Home
      </BreadcrumbPage>
    </BreadcrumbItem>,
  ];

  if (pathname !== "/") {
    const segments = pathname.split("/").filter(Boolean);
    breadcrumbItems = segments.map((segment, i) => {
      const prevSegment = i > 0 ? segments[i - 1] : null;
      if (prevSegment === "folders" || prevSegment === "papers") {
        return null;
      }

      const href = "/" + segments.slice(0, i + 1).join("/");
      const isLast = i === segments.length - 1;
      return (
        <BreadcrumbItem key={i}>
          {isLast ? (
            <BreadcrumbPage className="flex items-center gap-2 capitalize">
              {SEGMENT_ICON_MAPPING[segment]} {segment}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href} className="capitalize">
              {segment}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );
    });
  }

  return (
    <Breadcrumb className={props.className}>
      <BreadcrumbList>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Qurious</BreadcrumbLink>
          </BreadcrumbItem>
        </motion.span>

        {breadcrumbItems.map(
          (item, i) =>
            item && (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <SlashBreadcrumbSeparator />
                {item}
              </motion.span>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
