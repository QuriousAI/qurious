import { Separator } from "@workspace/design-system/components/separator";
import { UserProfile } from "@clerk/nextjs";
import { Heading } from "@/components/global-heading";
import { UserCog } from "@workspace/design-system/icons";

export const metadata = {
  title: "Account Settings | Qurious",
};

export default function AccountSettingsPage() {
  return (
    <div className="space-y-2">
      <Heading
        heading="Account Settings"
        subHeading="Manage your account profile and authentication settings."
        icon={<UserCog />}
      />
      <UserProfile />
    </div>
  );
}