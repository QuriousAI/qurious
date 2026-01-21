import { Heading } from "@/components/global-heading";
import { CreditsClient } from "./client";
import { CreditCard } from "@workspace/design-system/icons";

export const metadata = {
  title: "Credits | Qurious",
};

export default function CreditsSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Credits"
        subHeading="Manage your credits and billing preferences."
        icon={<CreditCard />}
      />
      <CreditsClient />
    </div>
  );
}
