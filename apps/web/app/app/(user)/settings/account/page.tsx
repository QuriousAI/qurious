import { Button } from "@workspace/design-system/components/button";
import { UserProfile, SignOutButton } from "@clerk/nextjs";
import { Heading } from "@/components/global-heading";
import { UserCog, LogOut } from "@workspace/design-system/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";

export const metadata = {
  title: "Account Settings | Qurious",
};

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Account Settings"
        subHeading="Manage your account profile and authentication settings."
        icon={<UserCog />}
      />

      <Card className="overflow-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your profile information and connected accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfile />
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Sign Out</CardTitle>
          <CardDescription>Sign out of your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignOutButton>
            <Button variant="destructive" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </CardContent>
      </Card>
    </div>
  );
}
