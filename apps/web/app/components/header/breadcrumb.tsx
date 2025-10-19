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

const SlashBreadcrumbSeparator = () => {
  return (
    <BreadcrumbSeparator>
      <SlashIcon />
    </BreadcrumbSeparator>
  );
};

const SEGMENT_ICON_MAPPING = {
  folders: <Folders className="size-4" />,
  settings: <Settings className="size-4" />,
  papers: <File className="size-4" />,
  search: <Search className="size-4" />,
  account: <User className="size-4" />,
  customization: <Palette className="size-4" />,
  subscription: <CreditCard className="size-4" />,
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
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Qurious App</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map(
          (item, i) =>
            item && (
              <React.Fragment key={i}>
                <SlashBreadcrumbSeparator />
                {item}
              </React.Fragment>
            )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
