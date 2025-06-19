import { Separator } from "@workspace/ui/src/components/separator";
import { UserProfile } from "@clerk/nextjs";
import { Heading } from "@/components/heading";

export const metadata = {
  title: "Account Settings | Qurious",
};

export default function AccountSettingsPage() {
  return (
    <div className="space-y-2">
      <Heading
        heading="Account Settings"
        subHeading="Manage your account profile and authentication settings."
      />
      <UserProfile />
    </div>
  );
}
