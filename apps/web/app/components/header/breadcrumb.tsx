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
  ChevronRight,
  Home,
  File,
  Folders,
  Search,
} from "@workspace/design-system/icons";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

const ChevronSeparator = () => {
  return (
    <BreadcrumbSeparator className="text-muted-foreground/50">
      <ChevronRight className="size-3.5" />
    </BreadcrumbSeparator>
  );
};

const SEGMENT_ICON_MAPPING: Record<string, React.ReactNode> = {
  folders: <Folders className="size-3.5" />,
  papers: <File className="size-3.5" />,
  search: <Search className="size-3.5" />,
};

export const HeaderBreadcrumb = (props: { className: string }) => {
  const pathname = usePathname();
  let breadcrumbItems: (React.ReactNode | null)[] = [
    <BreadcrumbItem key="home">
      <BreadcrumbPage className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-foreground text-sm font-medium">
        <Home className="size-3.5" /> Home
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
      const icon = SEGMENT_ICON_MAPPING[segment];

      return (
        <BreadcrumbItem key={i}>
          {isLast ? (
            <BreadcrumbPage className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 text-foreground text-sm font-medium">
              {icon} <span className="capitalize">{segment}</span>
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              href={href}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200 capitalize"
            >
              {icon} {segment}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      );
    });
  }

  return (
    <Breadcrumb className={props.className}>
      <BreadcrumbList className="gap-1">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center"
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-base font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200"
            >
              Qurious
            </BreadcrumbLink>
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
                className="inline-flex items-center"
              >
                <ChevronSeparator />
                {item}
              </motion.span>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
