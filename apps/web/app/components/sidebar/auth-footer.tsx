import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/src/components/sidebar";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  Settings2,
  UserCog,
} from "@workspace/ui/src/iconography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/src/components/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/src/components/avatar";

/** This is the menu item for the user dropdown. Trigger = User Bar, Content = Dropdown For User Settings */
export const SidebarMenuItem_UserDropwn = () => {
  const { user } = useUser();

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="py-4" size={"lg"}>
            <Avatar>
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex-col text-left leading-tight">
              <div className="font-semibold">{user.fullName}</div>
              <div className="text-xs text-muted-foreground font-medium">
                {user.primaryEmailAddress.emailAddress}
              </div>
            </div>
            <Settings2 className="ml-auto size-6" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          <DropdownMenuItem>
            <Link href="/account" className="flex w-full items-center gap-2">
              <UserCog className="size-5 text-white" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/settings/subscription"
              className="flex w-full items-center gap-2"
            >
              <CreditCard className="size-5 text-white" />
              <span>Subscription</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <div className="flex w-full items-center gap-2 hover:cursor-pointer">
                <LogOut className="size-5 text-white" />
                Sign Out
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
