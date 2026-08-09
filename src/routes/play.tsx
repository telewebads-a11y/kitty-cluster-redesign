import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Pause, Settings, Play as PlayIcon, Home, Share2 } from "lucide-react";
import { AppShell } from "@/components/kc/AppShell";
import { ActionButton, Card, CoinPill } from "@/components/kc/primitives";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { player } from "@/data/mock";
import {
  canPlace,
  comboLabel,
  CRITTERS,
  emptyBoard,
  hasAnyMove,
  newPiece,
  resolveClears,
  type Cell,
  type Piece,
} from "@/lib/game";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play Kitty Cluster — 9x9 Critter Block Puzzle" },
      {
        name: "description",
        content: "Drop critter blocks on the 9x9 board, clear rows, columns and 3x3 boxes, and chain mega combos.",
      },
      { property: "og:title", content: "Play Kitty Cluster — 9x9 Critter Block Puzzle" },
      { property: "og:description", content: "Clear rows, columns and boxes to build mega combos." },
    ],
  }),
  component: PlayScreen,
});

const critterClass = Object.fromEntries(CRITTERS.map((c) => [c.id, c.color]));
const critterEmoji = Object.fromEntries(CRITTERS.map((c) => [c.id, c.emoji]));

function PlayScreen() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [pieces, setPieces] = useState<(Piece | null)[]>(() => [newPiece(), newPiece(), newPiece()]);
  const [selected, setSelected] = useState(0);
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(player.coins);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [clearing, setClearing] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [floaters, setFloaters] = useState<{ id: number; text: string }[]>([]);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const activePiece = pieces[selected] ?? pieces.find((p) => p) ?? null;

  const float = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setFloaters((f) => [...f, { id, text }]);
    setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 900);
  }, []);

  const reset = () => {
    setBoard(emptyBoard());
    setPieces([newPiece(), newPiece(), newPiece()]);
    setSelected(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setGameOver(false);
    setVictory(false);
  };

  const place = (r: number, c: number) => {
    if (!activePiece || paused || gameOver) return;
    if (!canPlace(board, activePiece.shape, r, c)) return;

    const next = board.map((row) => [...row]);
    activePiece.shape.forEach(([dr, dc]) => {
      next[r + dr]![c + dc] = activePiece.critter;
    });

    let gained = activePiece.shape.length * 10;
    const { board: cleaned, cleared, count } = resolveClears(next);

    if (count > 0) {
      const nextCombo = combo + count;
      setCombo(nextCombo);
      setMaxCombo((m) => Math.max(m, nextCombo));
      gained += count * 120 * count;
      const earnedCoins = count * 10;
      setCoins((v) => v + earnedCoins);
      setToast(comboLabel(count));
      float(`+${earnedCoins} 🪙`);
      setClearing(cleared);
      setBoard(next);
      setTimeout(() => {
        setBoard(cleaned);
        setClearing([]);
      }, 300);
      setTimeout(() => setToast(null), 900);
    } else {
      setCombo(0);
      setBoard(next);
    }

    setScore((s) => s + gained);
    float(`+${gained}`);

    const remaining = pieces.map((p, i) => (i === selected ? null : p));
    const refilled = remaining.every((p) => !p) ? [newPiece(), newPiece(), newPiece()] : remaining;
    setPieces(refilled);
    setSelected(refilled.findIndex((p) => p));
    setHover(null);

    setTimeout(() => {
      const check = count > 0 ? cleaned : next;
      if (!hasAnyMove(check, refilled)) setGameOver(true);
    }, 400);
  };

  useEffect(() => {
    if (score > 0 && score >= 3000 && !victory && !gameOver) setVictory(true);
  }, [score, victory, gameOver]);

  const previewCells = useMemo(() => {
    if (!hover || !activePiece) return new Set<string>();
    if (!canPlace(board, activePiece.shape, hover.r, hover.c)) return new Set<string>();
    return new Set(activePiece.shape.map(([dr, dc]) => `${hover.r + dr}-${hover.c + dc}`));
  }, [hover, activePiece, board]);

  return (
    <AppShell>
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
        <Link to="/" className="press grid size-9 place-items-center rounded-xl bg-secondary">
          <ArrowLeft size={17} />
        </Link>
        <p className="truncate text-center font-display text-base font-extrabold">Kitty Cluster</p>
        <div className="flex shrink-0 gap-2">
          <Link to="/settings" className="press grid size-9 place-items-center rounded-xl bg-secondary">
            <Settings size={17} />
          </Link>
          <button
            type="button"
            onClick={() => setPaused(true)}
            className="press grid size-9 place-items-center rounded-xl bg-secondary"
          >
            <Pause size={17} />
          </button>
        </div>
      </header>

      <div className="relative">
        <Card className="grid grid-cols-3 items-center gap-2 text-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase text-muted-foreground">Score</p>
            <p className="font-display text-2xl font-extrabold leading-none">{score.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase text-muted-foreground">Best</p>
            <p className="font-display text-lg font-extrabold leading-none">{player.best.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-display text-sm font-extrabold text-streak">🔥 x{Math.max(combo, 1)}</p>
            <CoinPill amount={coins} />
          </div>
        </Card>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center">
          {floaters.map((f) => (
            <span key={f.id} className="animate-rise font-display text-sm font-extrabold text-primary">
              {f.text}
            </span>
          ))}
        </div>
      </div>

      <div className="relative rounded-3xl bg-board p-2 shadow-pop">
        <div className="grid grid-cols-9 gap-[3px]">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              const preview = previewCells.has(key);
              const boxShade = (Math.floor(r / 3) + Math.floor(c / 3)) % 2 === 0;
              return (
                <button
                  key={key}
                  type="button"
                  onPointerEnter={() => setHover({ r, c })}
                  onPointerDown={() => setHover({ r, c })}
                  onClick={() => place(r, c)}
                  className={cn(
                    "relative aspect-square rounded-[7px] transition-all duration-150",
                    boxShade ? "bg-board-cell" : "bg-board-cell/60",
                    preview && "ring-2 ring-primary",
                    (r === 2 || r === 5) && "mb-[3px]",
                    (c === 2 || c === 5) && "mr-[3px]",
                  )}
                >
                  {cell && (
                    <span
                      className={cn(
                        "absolute inset-0 grid place-items-center rounded-[7px] text-[11px] shadow-inset-soft",
                        critterClass[cell],
                        clearing.includes(key) ? "animate-clear-cell" : "animate-pop-in",
                      )}
                    >
                      {critterEmoji[cell]}
                    </span>
                  )}
                  {preview && !cell && <span className="absolute inset-1 rounded-[5px] bg-primary/30" />}
                </button>
              );
            }),
          )}
        </div>
        {toast && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="animate-pop-in grad-play rounded-2xl px-4 py-2 font-display text-xl font-extrabold text-primary-foreground shadow-pop">
              {toast}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {pieces.map((p, i) => (
          <button
            key={p?.id ?? `empty-${i}`}
            type="button"
            disabled={!p}
            onClick={() => setSelected(i)}
            className={cn(
              "press grid h-24 place-items-center rounded-3xl border border-border bg-card p-2 transition-all",
              selected === i && p && "ring-2 ring-primary glow-primary",
              !p && "opacity-40",
            )}
          >
            {p && <PiecePreview piece={p} />}
          </button>
        ))}
      </div>
      <p className="text-center text-xs font-bold text-muted-foreground">
        Tap a critter block, then tap the board to place it
      </p>

      <Dialog open={paused} onOpenChange={setPaused}>
        <DialogContent className="max-w-xs rounded-3xl text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-extrabold">Paused</DialogTitle>
          </DialogHeader>
          <ActionButton size="lg" onClick={() => setPaused(false)}>
            <span className="inline-flex items-center justify-center gap-2">
              <PlayIcon size={16} /> Resume
            </span>
          </ActionButton>
          <ActionButton size="lg" variant="ghost" onClick={reset}>
            Restart
          </ActionButton>
          <Link to="/">
            <ActionButton size="lg" variant="ghost">
              Home
            </ActionButton>
          </Link>
        </DialogContent>
      </Dialog>

      <Dialog open={gameOver} onOpenChange={setGameOver}>
        <DialogContent className="max-w-xs rounded-3xl text-center">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold">Game Over</DialogTitle>
          </DialogHeader>
          <ResultStats score={score} maxCombo={maxCombo} />
          <ActionButton size="lg" onClick={reset}>
            Play Again
          </ActionButton>
          <div className="flex gap-2">
            <Link to="/" className="flex-1">
              <ActionButton size="lg" variant="ghost">
                <span className="inline-flex items-center justify-center gap-2">
                  <Home size={15} /> Home
                </span>
              </ActionButton>
            </Link>
            <ActionButton size="lg" variant="coin" className="flex-1" onClick={() => setGameOver(false)}>
              <span className="inline-flex items-center justify-center gap-2">
                <Share2 size={15} /> Share
              </span>
            </ActionButton>
          </div>
          <div className="rounded-2xl border border-dashed border-border p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Rewarded ad</p>
            <p className="mt-1 text-xs font-bold text-muted-foreground">Watch ad → +50 coins</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={victory} onOpenChange={setVictory}>
        <DialogContent className="max-w-xs overflow-hidden rounded-3xl text-center">
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="animate-confetti absolute top-0 size-2 rounded-sm bg-primary"
                style={{ left: `${(i * 7) % 100}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-extrabold">🎉 Puzzle Complete!</DialogTitle>
          </DialogHeader>
          <ResultStats score={score} maxCombo={maxCombo} />
          <p className="text-xs font-bold text-primary">New achievement: Combo King</p>
          <ActionButton size="lg" onClick={reset}>
            Next Level
          </ActionButton>
          <Link to="/">
            <ActionButton size="lg" variant="ghost">
              Home
            </ActionButton>
          </Link>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function ResultStats({ score, maxCombo }: { score: number; maxCombo: number }) {
  const rows: [string, string][] = [
    ["Final score", score.toLocaleString()],
    ["Best score", player.best.toLocaleString()],
    ["Highest combo", `x${Math.max(maxCombo, 1)}`],
    ["Coins earned", `${Math.round(score / 100)} 🪙`],
    ["XP earned", `${Math.round(score / 20)} XP`],
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map(([l, v]) => (
        <div key={l} className="flex items-center justify-between rounded-2xl bg-secondary px-3 py-2 text-sm font-bold">
          <span className="text-muted-foreground">{l}</span>
          <span className="font-display font-extrabold">{v}</span>
        </div>
      ))}
    </div>
  );
}

function PiecePreview({ piece }: { piece: Piece }) {
  const rows = Math.max(...piece.shape.map(([r]) => r)) + 1;
  const cols = Math.max(...piece.shape.map(([, c]) => c)) + 1;
  const set = new Set(piece.shape.map(([r, c]) => `${r}-${c}`));
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const filled = set.has(`${r}-${c}`);
        return (
          <span
            key={i}
            className={cn(
              "grid size-6 place-items-center rounded-md text-[10px]",
              filled ? cn(critterClass[piece.critter], "shadow-inset-soft") : "opacity-0",
            )}
          >
            {filled ? critterEmoji[piece.critter] : ""}
          </span>
        );
      })}
    </div>
  );
}