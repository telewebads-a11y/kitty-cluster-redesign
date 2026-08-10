import { Link } from "@tanstack/react-router";
import { Home, Puzzle, Settings, Trophy, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const items: { to: string; label: string; Icon: typeof Home; primary?: boolean }[] = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/tournament", label: "Tournament", Icon: Trophy },
  { to: "/play", label: "Play Game", Icon: Puzzle, primary: true },
  { to: "/settings", label: "Settings", Icon: Settings },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="grid grid-cols-5 items-end px-1 py-2">
        {items.map(({ to, label, Icon, primary }) => (
          <li key={to} className="flex justify-center">
            <Link
              to={to as "/"}
              activeOptions={{ exact: to === "/" }}
              className="group flex flex-col items-center gap-1"
            >
              {primary ? (
                <span className="grad-play press -mt-6 grid size-14 place-items-center rounded-3xl text-primary-foreground shadow-pop shadow-inset-soft">
                  <Icon size={26} />
                </span>
              ) : (
                <span
                  className={cn(
                    "press grid size-10 place-items-center rounded-2xl text-muted-foreground transition-colors",
                    "group-data-[status=active]:bg-secondary group-data-[status=active]:text-primary",
                  )}
                >
                  <Icon size={22} />
                </span>
              )}
              <span
                className={cn(
                  "text-[9px] font-bold uppercase tracking-wide text-muted-foreground",
                  "group-data-[status=active]:text-primary",
                  primary && "text-primary",
                )}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AppShell({
  children,
  nav = true,
  className,
}: {
  children: ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className={cn(
          "animate-fade-up mx-auto flex min-h-screen w-full max-w-md flex-col gap-4 px-4 pt-4",
          nav ? "pb-28" : "pb-6",
          className,
        )}
      >
        {children}
      </div>
      {nav && <BottomNav />}
    </div>
  );
}