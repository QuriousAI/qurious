import { Command } from "@workspace/design-system/icons";
import { Meteors } from "@workspace/design-system/components/magicui/meteors";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen overflow-hidden w-full p-4 bg-sidebar">
      <Meteors maxDuration={25} number={100} />

      {/* Left Side */}
      <div className="flex items-center justify-center w-1/2 bg-sidebar">
        <div className="flex gap-2 items-center z-100">
          <Command className="size-28" />
          <div className="flex flex-col">
            <div className="text-7xl font-semibold">Qurious</div>
            <div className="text-4xl font-medium text-muted-foreground pl-2">
              Your research assistant.
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="z-100 w-1/2 bg-background border shadow-xl rounded-xl flex overflow-y-auto no-scrollbar">
        <div className="m-auto py-8">{children}</div>
      </div>
    </div>
  );
}
