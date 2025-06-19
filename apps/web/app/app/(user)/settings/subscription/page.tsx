import { Separator } from "@workspace/ui/src/components/separator";
import { Heading } from "@/components/heading";
import { SubscriptionClient } from "./client";

export const metadata = {
  title: "Subscription Settings | Qurious",
};

export default function SubscriptionSettingsPage() {
  return (
    <div className="max-w-5xl space-y-2">
      <Heading
        heading="Subscription Settings"
        subHeading="Manage your subscription and billing preferences."
      />
      <SubscriptionClient />
    </div>
  );
}
