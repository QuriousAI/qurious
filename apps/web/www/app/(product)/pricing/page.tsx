import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic search functionality",
      "Up to 100 papers per month",
      "Basic folder organization",
      "Community support",
    ],
  },
  {
    name: "Premium",
    price: "$10/month",
    features: [
      "Unlimited searches",
      "Unlimited papers",
      "Advanced folder organization",
      "Priority support",
      "Custom paper collections",
      "API access",
      "Early access to new features",
    ],
  },
] as const;

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-5xl font-bold">Pricing.</div>
        <div className="text-xl font-bold text-neutral-500">Coming Soon™️</div>
      </div>

      <div className="text-5xl font-bold">Pricing</div>
      <div className="flex gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="flex w-80 flex-col gap-4 rounded-lg border border-neutral-200 p-6"
          >
            <div className="text-2xl font-bold">{tier.name}</div>
            <div className="text-3xl font-bold">{tier.price}</div>
            <div className="flex flex-col gap-2">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <div>{feature}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600">
              {tier.name === "Free" ? "Get Started" : "Upgrade Now"}
              <Link href="https://test.checkout.dodopayments.com/buy/pdt_KSZAxqQWozQ8hpwOz25Y3?quantity=1">
                Checkout
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
