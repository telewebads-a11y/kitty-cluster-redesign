import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, UserPlus, Users, Palette, Star } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import {
  ActionButton,
  Avatar,
  Card,
  CoinPill,
  Pill,
  ProgressBar,
  SectionTitle,
  StatTile,
} from "@/components/kc/primitives";
import { achievements, avatars, friends, player, plans, themes, trophies } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Kitty Cluster" },
      {
        name: "description",
        content: "Track your level, stats, trophies, achievements, friends, avatars and themes in Kitty Cluster.",
      },
      { property: "og:title", content: "Your Profile — Kitty Cluster" },
      { property: "og:description", content: "Stats, trophy room, avatars, themes and premium plans." },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const [avatar, setAvatar] = useState(player.avatar);

  return (
    <AppShell>
      <Card className="grad-brand border-0 text-center text-primary-foreground">
        <Avatar emoji={avatar} size={84} className="mx-auto bg-card/25" />
        <h1 className="mt-2 font-display text-xl font-extrabold">{player.name}</h1>
        <p className="text-xs font-bold opacity-90">{player.username}</p>
        <p className="text-xs font-bold opacity-75">{player.email}</p>
        <div className="mx-auto mt-3 max-w-56">
          <ProgressBar value={(player.xp / player.xpMax) * 100} className="bg-card/25" />
          <p className="mt-1 text-[11px] font-bold opacity-90">Level {player.level} • {player.xp}/{player.xpMax} XP</p>
        </div>
        <ActionButton className="mx-auto mt-3 w-auto" size="sm" variant="coin">
          <span className="inline-flex items-center gap-1.5">
            <Pencil size={13} /> Edit Profile
          </span>
        </ActionButton>
      </Card>

      <SectionTitle title="Statistics" />
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile label="Games played" value={player.gamesPlayed} />
        <StatTile label="Games won" value={player.gamesWon} />
        <StatTile label="Best score" value={player.best.toLocaleString()} />
        <StatTile label="Highest combo" value={`x${player.highestCombo}`} />
        <StatTile label="Total XP" value={player.totalXp.toLocaleString()} />
        <StatTile label="Win rate" value={`${player.winRate}%`} />
        <StatTile label="Current level" value={player.level} />
        <StatTile label="Streak" value={`🔥 ${player.streak}`} />
      </div>

      <SectionTitle title="Friends" />
      <Card>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["Friends", friends.total],
            ["Online", friends.online],
            ["Requests", friends.pending],
          ].map(([l, v]) => (
            <div key={String(l)} className="rounded-2xl bg-secondary px-2 py-2">
              <p className="text-[10px] font-bold uppercase text-muted-foreground">{l}</p>
              <p className="font-display text-lg font-extrabold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {friends.list.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-2">
              <Avatar emoji={f.avatar} size={36} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">{f.name}</p>
                <p className="text-[11px] font-bold text-muted-foreground">
                  Level {f.level} • {f.online ? "Online" : "Offline"}
                </p>
              </div>
              <ActionButton size="sm" variant="ghost">
                Challenge
              </ActionButton>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <ActionButton size="lg" className="flex-1">
            <span className="inline-flex items-center justify-center gap-1.5">
              <UserPlus size={15} /> Add Friend
            </span>
          </ActionButton>
          <ActionButton size="lg" variant="ghost" className="flex-1">
            <span className="inline-flex items-center justify-center gap-1.5">
              <Users size={15} /> Invite
            </span>
          </ActionButton>
        </div>
      </Card>

      <SectionTitle title="Avatars" />
      <Card>
        <div className="grid grid-cols-4 gap-2">
          {avatars.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAvatar(a.emoji)}
              className={cn(
                "press flex flex-col items-center gap-1 rounded-2xl bg-secondary py-2",
                avatar === a.emoji && "ring-2 ring-primary",
              )}
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className="text-[10px] font-bold text-muted-foreground">{a.label}</span>
            </button>
          ))}
        </div>
        <ActionButton className="mt-3" size="lg" variant="ghost">
          Upload Profile Picture
        </ActionButton>
      </Card>

      <SectionTitle title="🏆 Trophy Room" />
      <div className="grid grid-cols-2 gap-2.5">
        {trophies.map((t) => (
          <Card
            key={t.id}
            className={cn(
              "flex flex-col items-center gap-1 p-3 text-center",
              !t.unlocked && "opacity-55",
              t.unlocked && t.tier === "gold" && "ring-1 ring-gold",
            )}
          >
            <span className="text-3xl">{t.unlocked ? t.icon : "🔒"}</span>
            <p className="text-xs font-extrabold leading-tight">{t.label}</p>
            <Pill
              className={cn(
                "text-[10px]",
                t.tier === "gold" && "bg-gold/25",
                t.tier === "silver" && "bg-silver/25",
                t.tier === "bronze" && "bg-bronze/25",
              )}
            >
              {t.unlocked ? t.tier.toUpperCase() : "LOCKED"}
            </Pill>
          </Card>
        ))}
      </div>

      <SectionTitle title="Achievements" />
      <div className="flex flex-col gap-2">
        {achievements.map((a) => (
          <Card key={a.id} className="flex items-center gap-3 p-3">
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", a.done ? "bg-primary/15" : "bg-secondary")}>
              {a.done ? "✓" : "🔒"}
            </span>
            <p className={cn("flex-1 text-sm font-bold", !a.done && "text-muted-foreground")}>{a.label}</p>
            <CoinPill amount={a.done ? "Earned" : "+50"} />
          </Card>
        ))}
      </div>

      <SectionTitle title="Themes" />
      <div className="grid grid-cols-2 gap-2.5">
        {themes.map((t) => (
          <Card key={t.id} className="p-3">
            <div className="flex h-14 overflow-hidden rounded-xl">
              {t.colors.map((c) => (
                <span key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs font-extrabold">
              <Palette size={12} /> {t.label}
            </p>
            <div className="mt-2">
              {t.owned ? (
                <ActionButton size="sm" className="w-full">
                  Equip
                </ActionButton>
              ) : (
                <ActionButton size="sm" variant="coin" className="w-full">
                  🪙 {t.price}
                </ActionButton>
              )}
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle title="Premium" />
      <Card className="grad-premium border-0 text-primary-foreground">
        <p className="flex items-center gap-1.5 font-display text-lg font-extrabold">
          <Star size={17} /> KITTY CLUSTER PREMIUM
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] font-bold opacity-90">
          {["No ads", "Exclusive themes", "Exclusive avatars", "Bonus coins", "Premium tournaments", "Exclusive rewards"].map(
            (f) => (
              <li key={f}>• {f}</li>
            ),
          )}
        </ul>
        <div className="mt-3 flex flex-col gap-2">
          {plans.map((p) => (
            <div
              key={p.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl bg-card/20 px-3 py-2.5",
                p.best && "ring-2 ring-primary-foreground/70",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-extrabold">{p.label}</p>
                <p className="text-[11px] font-bold opacity-85">{p.note}</p>
              </div>
              <span className="font-display text-base font-extrabold">{p.price}</span>
              <ActionButton size="sm" variant="coin">
                Get
              </ActionButton>
            </div>
          ))}
        </div>
      </Card>

      <Link to="/settings">
        <ActionButton size="lg" variant="ghost">
          Settings
        </ActionButton>
      </Link>
    </AppShell>
  );
}