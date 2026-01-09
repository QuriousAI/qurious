import { Separator } from "@workspace/design-system/components/separator";
import { Heading } from "@/components/global-heading";
import { SubscriptionClient } from "./client";
import { CreditCard } from "@workspace/design-system/icons";

export const metadata = {
  title: "Subscription Settings | Qurious",
};

export default function SubscriptionSettingsPage() {
  return (
    <div className="max-w-5xl space-y-2">
      <Heading
        heading="Subscription Settings"
        subHeading="Manage your subscription and billing preferences."
        icon={<CreditCard />}
      />
      <SubscriptionClient />
    </div>
  );
}