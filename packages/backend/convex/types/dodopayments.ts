import { Subscription } from "dodopayments/resources/subscriptions";

type SubscriptionJSON = Subscription & { payload_type: string };

type Webhook<EvtType, Data> = {
  type: EvtType;
  data: Data;
};

type SubscriptionWebhookEvent = Webhook<
  "subscription.active",
  SubscriptionJSON
>;

type WebhookEvent = SubscriptionWebhookEvent;

export type { WebhookEvent };
