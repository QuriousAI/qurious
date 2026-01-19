import * as React from "react";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useQuery } from "convex/react";
import { SignOutButton, useUser, UserProfile } from "@clerk/nextjs";
import { motion } from "motion/react";

import { AddSearchToFolderDropdownMenu } from "../dropdowns/add-search-to-folder";
import { DeleteSearchDialogContent } from "../dialogs/search/delete";
import { Heading } from "../global-heading";
import { InformationTooltip } from "@/components/information-tooltip";
import { ToastPromise } from "@/utils/toast";

import { getRandomSidebarNoSearchPlaceholder } from "../../utils/placeholders/no-searches";

import {
  useAddSearchToFolderMutation,
  useDeleteAllFoldersMutation,
  useDeleteAllSearchesMutation,
  useGetCurrentUserSearchesQuery,
  useRemoveSearchFromFolderMutation,
} from "@/queries";

import { playToastSound } from "@workspace/design-system/lib/sound";
import { toast } from "@workspace/design-system/components/sonner";
import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import { api } from "@workspace/backend/_generated/api";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/design-system/components/sidebar";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/design-system/components/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/design-system/components/avatar";
import { Separator } from "@workspace/design-system/components/separator";
import { Label } from "@workspace/design-system/components/label";
import { Switch } from "@workspace/design-system/components/switch";
import { Checkbox } from "@workspace/design-system/components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/design-system/components/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/design-system/components/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { Badge } from "@workspace/design-system/components/badge";
import { Textarea } from "@workspace/design-system/components/textarea";

import {
  Brush,
  ChevronDown,
  CreditCard,
  Folder,
  Folders,
  Key,
  LogOut,
  MoreVertical,
  MoveLeft,
  MoveRight,
  Palette,
  Plus,
  Search,
  Settings,
  Settings2,
  Share2,
  Trash2,
  UserCog,
} from "@workspace/design-system/icons";
import { Button } from "@workspace/design-system/components/button";

/** This is the menu item for the user dropdown. Trigger = User Bar, Content = Dropdown For User Settings */
export const SidebarMenuItem_UserDropdown = () => {
  const { user } = useUser();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="py-4" size={"lg"}>
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div className="flex-col flex-1 text-left leading-tight">
          <div className="font-semibold">{user.fullName}</div>
        </div>
        <Button variant="icon">
          <Link href="/settings/account">
            <Settings />
          </Link>
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuItem_Search = (props: {
  search: Doc<"searches">;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
        delay: props.index * 0.03,
        ease: "easeOut",
      }}
    >
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/search?q=${encodeURIComponent(props.search.query)}`}>
            <span>{props.search.query}</span>
          </Link>
        </SidebarMenuButton>

        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreVertical />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <AddSearchToFolderDropdownMenu searchId={props.search._id} />

              <DialogTrigger asChild>
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteSearchDialogContent
            name={props.search.query}
            searchId={props.search._id}
          />
        </Dialog>
      </SidebarMenuItem>
    </motion.div>
  );
};

// return searches sorted by today, yesterday, last 7 days, Last 30 days, Older...
const sortSearchesByDate = (searches: Doc<"searches">[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const last7Days = new Date(today);
  last7Days.setDate(last7Days.getDate() - 7);
  const last30Days = new Date(today);
  last30Days.setDate(last30Days.getDate() - 30);

  const sortedSearches = searches.reduce(
    (acc, search) => {
      const searchDate = new Date(search._creationTime);

      if (searchDate >= today) {
        acc.today.push(search);
      } else if (searchDate >= yesterday) {
        acc.yesterday.push(search);
      } else if (searchDate >= last7Days) {
        acc.last7Days.push(search);
      } else if (searchDate >= last30Days) {
        acc.last30Days.push(search);
      } else {
        acc.older.push(search);
      }

      return acc;
    },
    {
      today: [] as Doc<"searches">[],
      yesterday: [] as Doc<"searches">[],
      last7Days: [] as Doc<"searches">[],
      last30Days: [] as Doc<"searches">[],
      older: [] as Doc<"searches">[],
    },
  );

  return sortedSearches;
};

const SearchMenu = (props: { searches: Doc<"searches">[] }) => {
  const sortedSearches = sortSearchesByDate(props.searches);
  let indexCounter = 0;

  return (
    <SidebarMenu>
      {sortedSearches.today.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarGroupLabel className="font-light">Today</SidebarGroupLabel>
          </motion.div>
          {sortedSearches.today.map((search, i) => (
            <SidebarMenuItem_Search
              key={i}
              search={search}
              index={indexCounter++}
            />
          ))}
        </>
      )}

      {sortedSearches.yesterday.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarGroupLabel>Yesterday</SidebarGroupLabel>
          </motion.div>
          {sortedSearches.yesterday.map((search, i) => (
            <SidebarMenuItem_Search
              key={i}
              search={search}
              index={indexCounter++}
            />
          ))}
        </>
      )}

      {sortedSearches.last7Days.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarGroupLabel>Last 7 Days</SidebarGroupLabel>
          </motion.div>
          {sortedSearches.last7Days.map((search, i) => (
            <SidebarMenuItem_Search
              key={i}
              search={search}
              index={indexCounter++}
            />
          ))}
        </>
      )}

      {sortedSearches.last30Days.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarGroupLabel>Last 30 Days</SidebarGroupLabel>
          </motion.div>
          {sortedSearches.last30Days.map((search, i) => (
            <SidebarMenuItem_Search
              key={i}
              search={search}
              index={indexCounter++}
            />
          ))}
        </>
      )}

      {sortedSearches.older.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarGroupLabel>Older</SidebarGroupLabel>
          </motion.div>
          {sortedSearches.older.map((search, i) => (
            <SidebarMenuItem_Search
              key={i}
              search={search}
              index={indexCounter++}
            />
          ))}
        </>
      )}
    </SidebarMenu>
  );
};

export function SearchGroup() {
  let returnDiv: React.ReactNode;

  const {
    data: searches = [],
    isPending: searchesPending,
    error: searchesError,
  } = useGetCurrentUserSearchesQuery();

  if (searchesPending) {
    returnDiv = <div className="text-neutral-500">Loading...</div>;
  } else if (searchesError) {
    returnDiv = (
      <div className="text-destructive">
        Error loading searches: {searchesError?.message}
      </div>
    );
  } else if (searches.length === 0) {
    returnDiv = (
      <div className="text-neutral-500">
        🦗 {getRandomSidebarNoSearchPlaceholder()}
      </div>
    );
  } else {
    returnDiv = <SearchMenu searches={searches} />;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Searches</SidebarGroupLabel>
      <SidebarGroupContent>{returnDiv}</SidebarGroupContent>
    </SidebarGroup>
  );
}
