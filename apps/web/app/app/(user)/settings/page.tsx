import { Separator } from "@workspace/ui/src/components/separator";
import { Heading } from "@/components/heading";
import { Button } from "@workspace/ui/src/components/button";
import {
  Settings,
  User,
  Palette,
  CreditCard,
} from "@workspace/ui/src/iconography";
import Link from "next/link";

export const metadata = {
  title: "Settings | Qurious",
};

export default function SettingsPage() {
  return (
    <div>
      <div className="space-y-2">
        <Heading
          heading="Settings"
          subHeading="Manage your account and application preferences."
          icon={<Settings className="size-6" />}
        />
      </div>

      <Link href="/settings/account">
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <User className="size-6" />
          <span>Account Settings</span>
        </Button>
      </Link>

      <Link href="/settings/customization">
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <Palette className="size-6" />
          <span>Customization</span>
        </Button>
      </Link>

      <Link href="/settings/subscription">
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <CreditCard className="size-6" />
          <span>Subscription</span>
        </Button>
      </Link>
    </div>
    // </div>
  );
}
