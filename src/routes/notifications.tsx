import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import { Card } from "@/components/kc/primitives";
import { notifications } from "@/data/mock";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Kitty Cluster" },
      { name: "description", content: "Tournament wins, streak reminders, daily challenges and friend requests." },
      { property: "og:title", content: "Notifications — Kitty Cluster" },
      { property: "og:description", content: "Everything happening in your Kitty Cluster world." },
    ],
  }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  return (
    <AppShell>
      <header className="flex items-center gap-2">
        <Link to="/" className="press grid size-9 place-items-center rounded-xl bg-secondary">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">Notifications</h1>
      </header>
      <div className="flex flex-col gap-2.5">
        {notifications.map((n) => (
          <Card key={n.id} className="flex items-center gap-3 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-lg">{n.icon}</span>
            <p className="min-w-0 flex-1 text-sm font-bold leading-snug">{n.text}</p>
            <span className="shrink-0 text-xs font-bold text-muted-foreground">{n.time}</span>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}