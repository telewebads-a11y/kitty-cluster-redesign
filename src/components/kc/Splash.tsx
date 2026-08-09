import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const blocks = ["🐱", "🐼", "🐰", "🦊", "🐻"];

export function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const tick = setInterval(() => setProgress((p) => Math.min(100, p + 9)), 150);
    const end = setTimeout(onDone, 2100);
    return () => {
      clearInterval(tick);
      clearTimeout(end);
    };
  }, [onDone]);

  return (
    <div className="grad-brand fixed inset-0 z-50 grid place-items-center px-8">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="animate-float">
          <Logo size={116} className="rounded-[2rem]" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-extrabold text-primary-foreground drop-shadow">Kitty Cluster</h1>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/80">
            Drop • Match • Clear • Score
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          {blocks.map((b, i) => (
            <span
              key={b}
              className="animate-pop-in grid size-10 place-items-center rounded-xl bg-card text-xl shadow-pop"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="mt-2 h-2 w-44 overflow-hidden rounded-full bg-primary-foreground/25">
          <div
            className="h-full rounded-full bg-primary-foreground transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}