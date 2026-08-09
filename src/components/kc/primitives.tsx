import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={cn("surface-card p-4", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between px-1">
      <h2 className="font-display text-base font-extrabold uppercase tracking-wide">{title}</h2>
      {action}
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CoinPill({ amount, className }: { amount: number | string; className?: string }) {
  return (
    <span
      className={cn(
        "grad-coin inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold text-coin-foreground shadow-inset-soft",
        className,
      )}
    >
      🪙 {typeof amount === "number" ? amount.toLocaleString() : amount}
    </span>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className="grad-play h-full rounded-full transition-[width] duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Avatar({
  emoji,
  size = 48,
  ring,
  className,
}: {
  emoji: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-secondary",
        ring && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      <span aria-hidden>{emoji}</span>
    </div>
  );
}

export function LiveDot({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 text-[11px] font-extrabold text-live">
      <span className="animate-pulse-ring size-2 rounded-full bg-live" />
      {label}
    </span>
  );
}

export function StatTile({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-3", className)}>
      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-1 font-display text-xl font-extrabold leading-none">{value}</p>
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "live" | "coin" | "ghost" | "premium";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary: "grad-play text-primary-foreground shadow-pop shadow-inset-soft",
    live: "grad-live text-primary-foreground shadow-pop shadow-inset-soft",
    coin: "grad-coin text-coin-foreground shadow-inset-soft",
    premium: "grad-premium text-primary-foreground shadow-pop shadow-inset-soft",
    ghost: "bg-secondary text-secondary-foreground",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-xs rounded-xl",
    md: "px-4 py-2.5 text-sm rounded-2xl",
    lg: "px-5 py-3.5 text-base rounded-3xl w-full",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press font-display font-extrabold uppercase tracking-wide",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Countdown({ d, h, m, s }: { d: number; h: number; m: number; s: number }) {
  const box = (v: number, l: string) => (
    <div className="min-w-12 rounded-xl bg-secondary px-2 py-1.5 text-center">
      <p className="font-display text-lg font-extrabold leading-none">{String(v).padStart(2, "0")}</p>
      <p className="text-[10px] font-bold text-muted-foreground">{l}</p>
    </div>
  );
  return (
    <div className="flex gap-2">
      {box(d, "DAYS")}
      {box(h, "HRS")}
      {box(m, "MIN")}
      {box(s, "SEC")}
    </div>
  );
}
