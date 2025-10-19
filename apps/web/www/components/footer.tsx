import { Discord } from "@workspace/design-system/icons";
import Link from "next/link";

const GreenPing = () => (
  <span className="relative flex size-3 opacity-80">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
  </span>
);



export const Footer = () => {
  const FooterMap = [
    {
      name: "Product",
      children: [
        { name: "Features", link: "/features" },
        { name: "Pricing", link: "/pricing" },
        { name: "Credits", link: "/credits" },
        { name: "Help Center", link: process.env.NEXT_PUBLIC_WEB_HELP_URL },
      ],
    },
    {
      name: "Company",
      children: [
        { name: "Contact", link: "/contact" },
        { name: "Blog", link: process.env.NEXT_PUBLIC_WEB_BLOG_URL },
        { name: "Discord", link: "" },
      ],
    },
    {
      name: "Legal",
      children: [
        { name: "Privacy Policy", link: "/privacy" },
        { name: "Terms & Conditions", link: "/terms" },
      ],
    },
  ];

  return (
    <div className="bg-neutral-900 w-full flex justify-around py-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-xl">Qurious</div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Qurious. All Rights Reserved
          </div>
        </div>

        <Link href="dsicord">
          <Discord className="text-neutral-400" />
        </Link>

        <Link
          href={process.env.NEXT_PUBLIC_WEB_STATUS_URL ?? ""}
          target="_blank"
          className="text-sm flex gap-2 items-center"
        >
          <GreenPing />
          All Systems Operational
        </Link>
      </div>
      <div className="flex gap-16">
        {FooterMap.map((section) => (
          <div key={section.name} className="flex flex-col gap-2">
            <div className="font-medium text-sm">{section.name}</div>
            <div className="flex flex-col gap-1">
              {section.children.map((item) => (
                <Link
                  key={item.name}
                  href={item.link?? ""}
                  target={item.link?.startsWith("http") ? "_blank" : undefined}
                  className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
