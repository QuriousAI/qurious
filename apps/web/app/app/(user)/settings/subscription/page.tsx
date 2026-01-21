import { Heading } from "@/components/global-heading";
import { SubscriptionClient } from "./client";
import { CreditCard } from "@workspace/design-system/icons";

export const metadata = {
  title: "Subscription Settings | Qurious",
};

export default function SubscriptionSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Heading
        heading="Subscription"
        subHeading="Manage your credits and billing preferences."
        icon={<CreditCard />}
      />
      <SubscriptionClient />
    </div>
  );
}
