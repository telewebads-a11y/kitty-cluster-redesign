import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import { ActionButton, Card, SectionTitle } from "@/components/kc/primitives";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Kitty Cluster" },
      { name: "description", content: "Sound, music, vibration, account, support and legal settings for Kitty Cluster." },
      { property: "og:title", content: "Settings — Kitty Cluster" },
      { property: "og:description", content: "Manage your game, account and support preferences." },
    ],
  }),
  component: SettingsScreen,
});

const toggles = ["Sound", "Music", "Vibration", "Notifications"];
const account = ["Profile", "Privacy", "Security", "Change Password"];
const support = ["How To Play", "FAQ", "Contact Support", "Send Feedback", "Rate Us"];
const legal = ["Privacy Policy", "Terms & Conditions"];

function Rows({ items }: { items: string[] }) {
  return (
    <Card className="p-0">
      {items.map((item, i) => (
        <button
          key={item}
          type="button"
          className={`press flex w-full items-center justify-between px-4 py-3.5 text-sm font-bold ${
            i > 0 ? "border-t border-border" : ""
          }`}
        >
          {item}
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      ))}
    </Card>
  );
}

function SettingsScreen() {
  return (
    <AppShell>
      <header className="flex items-center gap-2">
        <Link to="/" className="press grid size-9 place-items-center rounded-xl bg-secondary">
          <ArrowLeft size={17} />
        </Link>
        <h1 className="font-display text-2xl font-extrabold">Settings</h1>
      </header>

      <SectionTitle title="Game" />
      <Card className="p-0">
        {toggles.map((t, i) => (
          <div
            key={t}
            className={`flex items-center justify-between px-4 py-3.5 text-sm font-bold ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            {t}
            <Switch defaultChecked={i < 3} />
          </div>
        ))}
      </Card>

      <SectionTitle title="Account" />
      <Rows items={account} />

      <SectionTitle title="Support" />
      <Rows items={support} />

      <SectionTitle title="Legal" />
      <Rows items={legal} />

      <SectionTitle title="Account Actions" />
      <ActionButton size="lg" variant="ghost">
        Sign Out
      </ActionButton>
      <button type="button" className="press py-2 text-sm font-extrabold text-destructive">
        Delete Account
      </button>
    </AppShell>
  );
}