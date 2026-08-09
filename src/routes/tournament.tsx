import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Clock, Trophy } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import { ActionButton, Avatar, Card, Countdown, LiveDot, Pill, SectionTitle } from "@/components/kc/primitives";
import { leaderboard, liveTournaments, myTournaments, upcomingTournaments } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tournament")({
  head: () => ({
    meta: [
      { title: "Tournaments — Kitty Cluster" },
      {
        name: "description",
        content: "Join live Kitty Cluster tournaments, register for upcoming cups and track your podium finishes.",
      },
      { property: "og:title", content: "Tournaments — Kitty Cluster" },
      { property: "og:description", content: "Live rounds, prize pools and leaderboards for cute puzzle competitors." },
    ],
  }),
  component: TournamentScreen,
});

const tabs = ["LIVE", "UPCOMING", "MY TOURNAMENTS"] as const;

function TournamentScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("LIVE");

  return (
    <AppShell>
      <header className="flex items-center gap-2">
        <Trophy size={22} className="text-gold" />
        <h1 className="font-display text-2xl font-extrabold">Tournaments</h1>
      </header>

      <div className="flex gap-1 rounded-2xl bg-secondary p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-xl px-2 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-colors",
              tab === t ? "grad-play text-primary-foreground shadow-inset-soft" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "LIVE" &&
        liveTournaments.map((t) => (
          <Card key={t.id}>
            <div className="flex items-center justify-between">
              <LiveDot />
              <Pill className="bg-coin/20 text-coin-foreground">{t.prize}</Pill>
            </div>
            <h3 className="mt-2 font-display text-lg font-extrabold">{t.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Users size={13} /> {t.players.toLocaleString()} players
              </span>
              <span>{t.round}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> {t.time} left
              </span>
            </div>
            <ActionButton className="mt-3" size="lg" variant="live">
              Join Now
            </ActionButton>
          </Card>
        ))}

      {tab === "UPCOMING" &&
        upcomingTournaments.map((t) => (
          <Card key={t.id}>
            <div className="flex items-center justify-between">
              <Pill>Starts in {t.startsIn}</Pill>
              <Pill className="bg-coin/20 text-coin-foreground">{t.prize}</Pill>
            </div>
            <h3 className="mt-2 font-display text-lg font-extrabold">{t.name}</h3>
            <p className="text-xs font-bold text-muted-foreground">{t.registered} players registered</p>
            <ActionButton className="mt-3" size="lg">
              Register
            </ActionButton>
          </Card>
        ))}

      {tab === "MY TOURNAMENTS" &&
        myTournaments.map((t) => (
          <Card key={t.id} className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">🏆</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-extrabold">{t.name}</p>
              <p className="text-xs font-bold text-muted-foreground">{t.status}</p>
            </div>
            <Pill className="bg-coin/20 text-coin-foreground">{t.prize}</Pill>
          </Card>
        ))}

      <SectionTitle title="Official Tournament" />
      <Card className="grad-brand border-0 text-primary-foreground">
        <p className="font-display text-lg font-extrabold leading-tight">OFFICIAL KITTY CLUSTER TOURNAMENT</p>
        <p className="mt-1 text-xs font-bold opacity-90">
          Registration open • 5 rounds • Open to everyone • No invite needed • 60 registered players
        </p>
        <div className="mt-3 [&_div]:bg-card/20 [&_p]:text-primary-foreground">
          <Countdown d={2} h={6} m={41} s={18} />
        </div>
        <ActionButton className="mt-3" size="lg" variant="coin">
          View & Join
        </ActionButton>
      </Card>

      <SectionTitle title="Podium" />
      <Card>
        <div className="grid grid-cols-3 items-end gap-2">
          {[
            { ...leaderboard[1]!, medal: "🥈", h: "h-16", tint: "bg-silver/30" },
            { ...leaderboard[0]!, medal: "🥇", h: "h-24", tint: "bg-gold/35" },
            { ...leaderboard[2]!, medal: "🥉", h: "h-12", tint: "bg-bronze/30" },
          ].map((p) => (
            <div key={p.rank} className="flex flex-col items-center gap-1.5">
              <Avatar emoji={p.avatar} size={44} ring />
              <p className="truncate text-xs font-extrabold">{p.name}</p>
              <div className={cn("grid w-full place-items-center rounded-t-2xl", p.h, p.tint)}>
                <span className="text-2xl">{p.medal}</span>
                <span className="font-display text-xs font-extrabold">{p.score.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle title="Leaderboard" />
      <div className="flex flex-col gap-2">
        {leaderboard.map((p) => (
          <Card key={p.rank} className={cn("flex items-center gap-3 p-3", p.name === "You" && "ring-2 ring-primary")}>
            <span className="w-6 text-center font-display text-base font-extrabold text-muted-foreground">
              {p.rank}
            </span>
            <Avatar emoji={p.avatar} size={38} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold">{p.name}</p>
              <p className="text-xs font-bold text-muted-foreground">{p.score.toLocaleString()} pts</p>
            </div>
            <Pill className="bg-coin/20 text-coin-foreground">{p.prize}</Pill>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}