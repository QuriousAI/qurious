import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/design-system/components/sidebar";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  Settings2,
  UserCog,
  Palette,
} from "@workspace/design-system/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/design-system/components/dropdown-menu";
import { SignOutButton, UserProfile, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/design-system/components/avatar";

import * as React from "react";
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
import { Brush, Key, Share2 } from "@workspace/design-system/icons";
import { Heading } from "../global-heading";

import { Label } from "@workspace/design-system/components/label";
import { Textarea } from "@workspace/design-system/components/textarea";
import { Trash2 } from "@workspace/design-system/icons";
import {
  useDeleteAllFoldersMutation,
  useDeleteAllSearchesMutation,
} from "@/queries";
import { ToastPromise } from "@/utils/toast";
import { InformationTooltip } from "@/components/information-tooltip";



import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { Badge } from "@workspace/design-system/components/badge";
import { DrawerDialogDemo } from "./drawer-dialog-demo";

export function SubscriptionClient() {
  const userData = useQuery(api.users.queries.getCurrentUser);

  if (!userData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{userData.credits}</span>
            <Badge variant="secondary">remaining</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Credits are used for AI-powered features and searches.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Credits Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Paper Summary:</span>
              <span className="text-muted-foreground">2 credits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Study Snapshot:</span>
              <span className="text-muted-foreground">1 credit</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Ask Paper:</span>
              <span className="text-muted-foreground">1 credit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buy More Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Need more credits to continue using our AI features? Purchase
            additional credits below.
          </p>
          <button className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Link href="https://test.checkout.dodopayments.com/buy/pdt_1rRVmQaYdPvh3FcrzgFJ7?quantity=1">
              Purchase Credits
            </Link>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}



/** This is the menu item for the user dropdown. Trigger = User Bar, Content = Dropdown For User Settings */
export const SidebarMenuItem_UserDropwn = () => {
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
      <DrawerDialogDemo />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
