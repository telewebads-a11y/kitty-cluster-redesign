import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Flame, Trophy, Users, Plus, Play, Heart, MessageCircle, Share2 } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import { Logo, Wordmark } from "@/components/kc/Logo";
import { Splash } from "@/components/kc/Splash";
import {
  ActionButton,
  Avatar,
  Card,
  CoinPill,
  Countdown,
  LiveDot,
  Pill,
  ProgressBar,
  SectionTitle,
} from "@/components/kc/primitives";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { dailyRewards, feed, liveTournaments, player, weekDays } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kitty Cluster — Cute 9x9 Block Puzzle & Tournaments" },
      {
        name: "description",
        content:
          "Drop, match and clear adorable critter blocks on a 9x9 board. Daily challenges, streaks, live tournaments and friends.",
      },
      { property: "og:title", content: "Kitty Cluster — Cute 9x9 Block Puzzle & Tournaments" },
      {
        property: "og:description",
        content: "Drop • Match • Clear • Score. Play daily challenges and compete in live tournaments.",
      },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  const [splash, setSplash] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);
  const live = liveTournaments[0]!;

  return (
    <>
      {splash && <Splash onDone={() => setSplash(false)} />}
      <AppShell>
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Logo size={40} />
            <Wordmark className="truncate" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <CoinPill amount={player.coins} />
            <Link to="/notifications" className="press relative grid size-9 place-items-center rounded-xl bg-secondary">
              <Bell size={17} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-live" />
            </Link>
          </div>
        </header>

        <Card className="grad-brand border-0 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Avatar emoji={player.avatar} size={54} className="bg-card/25" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg font-extrabold leading-tight">{player.name}</p>
              <p className="text-xs font-bold opacity-85">LEVEL {player.level}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-card/25 px-2.5 py-1 text-xs font-extrabold">
              <Flame size={13} /> {player.streak} Day
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar value={(player.xp / player.xpMax) * 100} className="bg-card/25" />
            <div className="mt-1.5 flex justify-between text-[11px] font-bold opacity-90">
              <span>
                {player.xp} / {player.xpMax} XP
              </span>
              <span>Best {player.best.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-extrabold leading-tight">CONTINUE PLAYING</h2>
              <p className="text-sm font-bold text-muted-foreground">Classic Puzzle</p>
            </div>
            <span className="text-4xl">🐱</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["Level", player.level],
              ["Best", player.best.toLocaleString()],
              ["Progress", "80%"],
            ].map(([l, v]) => (
              <div key={String(l)} className="rounded-2xl bg-secondary px-2 py-2">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">{l}</p>
                <p className="font-display text-base font-extrabold">{v}</p>
              </div>
            ))}
          </div>
          <ProgressBar value={80} className="mt-3" />
          <Link to="/play" className="mt-4 block">
            <ActionButton size="lg">
              <span className="inline-flex items-center justify-center gap-2">
                <Play size={18} /> Play Now
              </span>
            </ActionButton>
          </Link>
        </Card>

        <SectionTitle title="Daily Challenge" />
        <Card>
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">🎯</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-extrabold leading-tight">DAILY CHALLENGE</p>
              <p className="text-xs font-bold text-muted-foreground">Complete today's puzzle</p>
            </div>
            <Link to="/play">
              <ActionButton size="sm">Play</ActionButton>
            </Link>
          </div>
          <div className="mt-3 flex gap-2">
            <CoinPill amount="+50 Coins" />
            <Pill className="bg-primary/15 text-primary">+100 XP</Pill>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {weekDays.map((d) => (
              <div
                key={d.day}
                className={
                  d.state === "today"
                    ? "grad-play rounded-xl px-1 py-2 text-center text-primary-foreground shadow-inset-soft"
                    : d.state === "done"
                      ? "rounded-xl bg-primary/15 px-1 py-2 text-center text-primary"
                      : "rounded-xl bg-secondary px-1 py-2 text-center text-muted-foreground"
                }
              >
                <p className="text-[9px] font-extrabold">{d.day}</p>
                <p className="text-xs font-extrabold">
                  {d.state === "done" ? "✓" : d.state === "today" ? "★" : "🔒"}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="relative">
          <div className="flex items-center gap-3">
            <span className="animate-float grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/25 text-2xl">
              ⭐
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-extrabold leading-tight">LEVEL OF THE DAY</p>
              <p className="text-xs font-bold text-muted-foreground">Today's spotlight puzzle • Special challenge</p>
              <span className="glow-primary mt-2 inline-flex rounded-full">
                <CoinPill amount="+30 Bonus" />
              </span>
            </div>
            <Link to="/play">
              <ActionButton size="sm" variant="coin">
                Play
              </ActionButton>
            </Link>
          </div>
        </Card>

        <SectionTitle title="Tournaments" action={<Link to="/tournament" className="text-xs font-bold text-primary">See all</Link>} />
        <Card className="grad-live border-0 text-primary-foreground">
          <div className="flex items-center justify-between">
            <LiveDot />
            <span className="animate-float text-3xl">🏆</span>
          </div>
          <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">LIVE TOURNAMENT</h3>
          <p className="text-xs font-bold opacity-90">Play • Compete • Win</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
            <div className="rounded-2xl bg-card/20 px-3 py-2">
              <p className="opacity-80">Players online</p>
              <p className="font-display text-base">{live.players.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-card/20 px-3 py-2">
              <p className="opacity-80">Prize pool</p>
              <p className="font-display text-base">{live.prize}</p>
            </div>
            <div className="rounded-2xl bg-card/20 px-3 py-2">
              <p className="opacity-80">Round</p>
              <p className="font-display text-base">{live.round}</p>
            </div>
            <div className="rounded-2xl bg-card/20 px-3 py-2">
              <p className="opacity-80">Time left</p>
              <p className="font-display text-base">{live.time}</p>
            </div>
          </div>
          <Link to="/tournament" className="mt-4 block">
            <ActionButton size="lg" variant="coin">
              Join Now
            </ActionButton>
          </Link>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-2xl">
              <Users size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-extrabold leading-tight">CREATE YOUR TOURNAMENT</p>
              <p className="text-xs font-bold text-muted-foreground">Private or public, invite your friends</p>
            </div>
          </div>
          <ActionButton className="mt-3" size="lg" variant="ghost" onClick={() => setCreateOpen(true)}>
            <span className="inline-flex items-center justify-center gap-2">
              <Plus size={16} /> Create Tournament
            </span>
          </ActionButton>
        </Card>

        <Card className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/25 text-2xl">🎁</span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold leading-tight">DAILY REWARD</p>
            <p className="text-xs font-bold text-muted-foreground">Day 5 chest is ready — 75 coins</p>
          </div>
          <ActionButton size="sm" variant="coin" onClick={() => setRewardOpen(true)}>
            Open
          </ActionButton>
        </Card>

        <SectionTitle title="My Wall" />
        <div className="flex flex-col gap-2.5">
          {feed.map((f) => (
            <Card key={f.id} className="p-3">
              <div className="flex gap-3">
                <Avatar emoji={f.avatar} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug">
                    <span className="font-extrabold">{f.name}</span>{" "}
                    <span className="text-muted-foreground">{f.text}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs font-bold text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Heart size={13} /> {f.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle size={13} /> Comment
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Share2 size={13} /> Share
                    </span>
                    <span className="ml-auto">{f.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-dashed bg-muted/40 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Advertisement</p>
          <p className="mt-1 text-xs font-bold text-muted-foreground">Banner ad space — 320 × 50</p>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <Trophy size={22} className="text-gold" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-extrabold">OFFICIAL KITTY CLUSTER TOURNAMENT</p>
              <p className="text-xs font-bold text-muted-foreground">Registration open • 5 rounds • 60 registered</p>
            </div>
          </div>
          <div className="mt-3">
            <Countdown d={2} h={6} m={41} s={18} />
          </div>
          <Link to="/tournament" className="mt-3 block">
            <ActionButton size="lg">View & Join</ActionButton>
          </Link>
        </Card>
      </AppShell>

      <CreateTournamentDialog open={createOpen} onOpenChange={setCreateOpen} />
      <DailyRewardDialog open={rewardOpen} onOpenChange={setRewardOpen} />
    </>
  );
}

function CreateTournamentDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-extrabold">Create Tournament</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <Label className="text-xs font-bold">Tournament name</Label>
            <Input placeholder="Kitty Weekend Cup" className="mt-1 rounded-2xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Players</Label>
              <Input type="number" defaultValue={16} className="mt-1 rounded-2xl" />
            </div>
            <div>
              <Label className="text-xs font-bold">Duration (hrs)</Label>
              <Input type="number" defaultValue={24} className="mt-1 rounded-2xl" />
            </div>
          </div>
          <div>
            <Label className="text-xs font-bold">Entry type</Label>
            <div className="mt-1 flex gap-2">
              <ActionButton size="sm" variant="ghost">
                Free
              </ActionButton>
              <ActionButton size="sm" variant="coin">
                100 Coins
              </ActionButton>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-secondary px-3 py-2.5">
            <span className="text-sm font-bold">Public tournament</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-secondary px-3 py-2.5">
            <span className="text-sm font-bold">Invite friends</span>
            <Switch />
          </div>
          <ActionButton size="lg" onClick={() => onOpenChange(false)}>
            Create Tournament
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DailyRewardDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl text-center">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-extrabold">Daily Reward</DialogTitle>
        </DialogHeader>
        <span className="animate-float mx-auto text-6xl">🎁</span>
        <div className="grid grid-cols-4 gap-2">
          {dailyRewards.map((r) => (
            <div
              key={r.day}
              className={
                r.claimed
                  ? "rounded-2xl bg-primary/15 px-1 py-2 text-primary"
                  : r.day === 5
                    ? "grad-coin rounded-2xl px-1 py-2 text-coin-foreground"
                    : "rounded-2xl bg-secondary px-1 py-2 text-muted-foreground"
              }
            >
              <p className="text-[10px] font-extrabold">DAY {r.day}</p>
              <p className="text-xs font-extrabold">{r.claimed ? "✓" : r.reward}</p>
            </div>
          ))}
        </div>
        <ActionButton size="lg" variant="coin" onClick={() => onOpenChange(false)}>
          Claim 75 Coins
        </ActionButton>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="text-xs font-bold text-muted-foreground underline"
        >
          Watch ad for double reward
        </button>
      </DialogContent>
    </Dialog>
  );
}