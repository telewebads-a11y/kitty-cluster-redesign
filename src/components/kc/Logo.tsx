import logo from "@/assets/kitty-logo.jpeg.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <img
      src={logo.url}
      width={size}
      height={size}
      alt="Kitty Cluster logo"
      className={cn("rounded-2xl object-cover shadow-pop", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-lg font-extrabold leading-none tracking-tight", className)}>
      Kitty <span className="text-primary">Cluster</span>
    </span>
  );
}