import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Pencil, UserPlus, Users, Palette, Mail, LogOut, Trash2, ImagePlus } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { achievements, avatars, friends, player, themes, trophies } from "@/data/mock";
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
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState(player.name);
  const [nickname, setNickname] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState(player.email);

  return (
    <AppShell>
      <Card className="grad-brand border-0 text-center text-primary-foreground">
        {photo ? (
          <img
            src={photo}
            alt="Your profile picture"
            className="mx-auto size-[84px] rounded-2xl object-cover"
          />
        ) : (
          <Avatar emoji={avatar} size={84} className="mx-auto bg-card/25" />
        )}
        <h1 className="mt-2 font-display text-xl font-extrabold">{name}</h1>
        <p className="text-xs font-bold opacity-90">{nickname ? `“${nickname}”` : player.username}</p>
        <p className="text-xs font-bold opacity-75">{signedIn ? email : "Not signed in"}</p>
        <div className="mx-auto mt-3 max-w-56">
          <ProgressBar value={(player.xp / player.xpMax) * 100} className="bg-card/25" />
          <p className="mt-1 text-[11px] font-bold opacity-90">Level {player.level} • {player.xp}/{player.xpMax} XP</p>
        </div>
        <ActionButton className="mx-auto mt-3 w-auto" size="sm" variant="coin" onClick={() => setEditOpen(true)}>
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
        <ActionButton className="mt-3" size="lg" variant="ghost" onClick={() => fileRef.current?.click()}>
          <span className="inline-flex items-center justify-center gap-1.5">
            <ImagePlus size={15} /> Choose From Gallery
          </span>
        </ActionButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPhoto(URL.createObjectURL(file));
          }}
        />
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

      <SectionTitle title="Account" />
      <Card>
        {signedIn ? (
          <>
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary">
                <Mail size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">{email}</p>
                <p className="text-[11px] font-bold text-muted-foreground">Signed in with Google</p>
              </div>
            </div>
            <ActionButton className="mt-3" size="lg" variant="ghost" onClick={() => setSignedIn(false)}>
              <span className="inline-flex items-center justify-center gap-1.5">
                <LogOut size={15} /> Sign Out
              </span>
            </ActionButton>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-muted-foreground">
              Sign in with your Gmail account to sync progress, coins and trophies.
            </p>
            <ActionButton className="mt-3" size="lg" onClick={() => setSignedIn(true)}>
              <span className="inline-flex items-center justify-center gap-1.5">
                <Mail size={15} /> Continue With Gmail
              </span>
            </ActionButton>
          </>
        )}
        <button
          type="button"
          className="press mt-3 inline-flex w-full items-center justify-center gap-1.5 py-2 text-sm font-extrabold text-destructive"
        >
          <Trash2 size={15} /> Delete Account
        </button>
      </Card>

      <Card className="border-dashed bg-muted/40 text-center">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Advertisement</p>
        <p className="mt-1 text-xs font-bold text-muted-foreground">Banner ad space — 320 × 50</p>
      </Card>

      <Link to="/settings">
        <ActionButton size="lg" variant="ghost">
          Settings
        </ActionButton>
      </Link>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-extrabold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {photo ? (
                <img src={photo} alt="Your profile picture" className="size-16 rounded-2xl object-cover" />
              ) : (
                <Avatar emoji={avatar} size={64} />
              )}
              <div className="flex flex-col gap-1.5">
                <ActionButton size="sm" variant="ghost" onClick={() => fileRef.current?.click()}>
                  <span className="inline-flex items-center gap-1.5">
                    <ImagePlus size={13} /> Change Picture
                  </span>
                </ActionButton>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="text-[11px] font-bold text-muted-foreground underline"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs font-bold">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 rounded-2xl" />
            </div>
            <div>
              <Label className="text-xs font-bold">Nickname (optional)</Label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Kitty Master"
                className="mt-1 rounded-2xl"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 rounded-2xl" />
            </div>
            <div>
              <Label className="text-xs font-bold">Favourite avatar</Label>
              <div className="mt-1 grid grid-cols-4 gap-2">
                {avatars.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAvatar(a.emoji)}
                    className={cn(
                      "press grid place-items-center rounded-2xl bg-secondary py-2 text-2xl",
                      avatar === a.emoji && "ring-2 ring-primary",
                    )}
                  >
                    {a.emoji}
                  </button>
                ))}
              </div>
            </div>
            <ActionButton size="lg" onClick={() => setEditOpen(false)}>
              Save Changes
            </ActionButton>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}