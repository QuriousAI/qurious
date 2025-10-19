import { Separator } from "@workspace/design-system/components/separator";
import { Heading } from "@/components/global-heading";
import { Button } from "@workspace/design-system/components/button";
import {
  Settings,
  User,
  Palette,
  CreditCard,
} from "@workspace/design-system/icons";
import Link from "next/link";

export const metadata = {
  title: "Settings | Qurious",
};

export default function SettingsPage() {
  return (
    <div>
      <div className="space-y-4">
        <Heading
          heading="Settings"
          subHeading="Manage your account and application preferences."
          icon={<Settings className="size-6" />}
        />

        <div className="grid grid-cols-1 gap-4 h-24">
          <Link href="/settings/account">
            <Button
              variant="outline"
              className="w-full h-full py-6 items-start flex flex-col  gap-2"
            >
              <div className="flex gap-2">
                <User className="size-6" />
                <span>Account Settings</span>
              </div>
              <div className="text-muted-foreground text-wrap text-left">
                Manage your account profile and authentication settings.
              </div>
            </Button>
          </Link>
          <Link href="/settings/customization">
            <Button
              variant="outline"
              className="w-full h-full py-6 items-start flex flex-col  gap-2"
            >
              <div className="flex gap-2">
                <Palette className="size-6" />
                <span>Customization</span>
              </div>
              <div className="text-muted-foreground text-wrap text-left">
                Customize your AI preferences.
              </div>
            </Button>
          </Link>
          <Link href="/settings/subscription">
            <Button
              variant="outline"
              className="w-full h-full  py-6 items-start flex flex-col  gap-2"
            >
              <div className="flex gap-2">
                <CreditCard className="size-6" />
                <span>Subscription</span>
              </div>
              <div className="text-muted-foreground text-wrap text-left">
                Manage your subscription and billing preferences.
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
