import { forwardRef } from "react";

const AppLogo = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      className="select-none pointer-event-none bg-radial from-neutral-800 from-30% to-neutral-950 shadow-xl border rounded-3xl flex items-center justify-center size-36"
    >
      <div className="drop-shadow-md drop-shadow-amber-800/50 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 inline-block text-transparent bg-clip-text text-9xl font-bold">
        Q
      </div>
    </div>
  );
});

AppLogo.displayName = "AppLogo";

export { AppLogo };
