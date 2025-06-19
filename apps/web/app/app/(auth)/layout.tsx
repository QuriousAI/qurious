import { Command } from "@workspace/ui/src/iconography";
import { Meteors } from "@workspace/ui/src/components/magicui/meteors";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen overflow-hidden w-full p-4 bg-sidebar">
      <Meteors maxDuration={25} number={100} />

      <div className="flex items-center justify-center w-1/2 bg-sidebar">
        <div className="flex gap-2 items-center z-100">
          <Command className="size-24" />
          <div className="flex flex-col">
            <div className="text-7xl font-semibold">Qurious</div>
            <div className="text-4xl font-medium text-muted-foreground pl-2">
              Your Academic Toolkit.
            </div>
          </div>
        </div>
      </div>
      <div className="z-100 w-1/2 bg-background border shadow-xl rounded-xl overflow-y-auto no-scrollbar justify-center items-center flex min-h-full">
        {children}
      </div>
    </div>
  );
}
