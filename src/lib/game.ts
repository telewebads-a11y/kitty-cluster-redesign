export type Critter = "cat" | "panda" | "rabbit" | "fox" | "bear" | "puppy";

export const CRITTERS: { id: Critter; emoji: string; color: string }[] = [
  { id: "cat", emoji: "🐱", color: "bg-cat" },
  { id: "panda", emoji: "🐼", color: "bg-panda" },
  { id: "rabbit", emoji: "🐰", color: "bg-rabbit" },
  { id: "fox", emoji: "🦊", color: "bg-fox" },
  { id: "bear", emoji: "🐻", color: "bg-bear" },
  { id: "puppy", emoji: "🐶", color: "bg-puppy" },
];

export type Cell = Critter | null;
export type Shape = [number, number][];

export const SHAPES: Shape[] = [
  [[0, 0]],
  [
    [0, 0],
    [0, 1],
  ],
  [
    [0, 0],
    [1, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 1],
  ],
];

export type Piece = { id: string; shape: Shape; critter: Critter };

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]!;

export function newPiece(): Piece {
  return {
    id: Math.random().toString(36).slice(2),
    shape: rand(SHAPES),
    critter: rand(CRITTERS).id,
  };
}

export function emptyBoard(): Cell[][] {
  return Array.from({ length: 9 }, () => Array<Cell>(9).fill(null));
}

export function canPlace(board: Cell[][], shape: Shape, r: number, c: number) {
  return shape.every(([dr, dc]) => {
    const rr = r + dr;
    const cc = c + dc;
    return rr >= 0 && rr < 9 && cc >= 0 && cc < 9 && board[rr]![cc] === null;
  });
}

export function hasAnyMove(board: Cell[][], pieces: (Piece | null)[]) {
  for (const p of pieces) {
    if (!p) continue;
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) if (canPlace(board, p.shape, r, c)) return true;
  }
  return false;
}

export type ClearResult = { board: Cell[][]; cleared: string[]; count: number };

export function resolveClears(board: Cell[][]): ClearResult {
  const marks = new Set<string>();
  let count = 0;

  for (let r = 0; r < 9; r++) {
    if (board[r]!.every((c) => c !== null)) {
      count++;
      for (let c = 0; c < 9; c++) marks.add(`${r}-${c}`);
    }
  }
  for (let c = 0; c < 9; c++) {
    if (board.every((row) => row[c] !== null)) {
      count++;
      for (let r = 0; r < 9; r++) marks.add(`${r}-${c}`);
    }
  }
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      let full = true;
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++)
          if (board[br * 3 + r]![bc * 3 + c] === null) full = false;
      if (full) {
        count++;
        for (let r = 0; r < 3; r++)
          for (let c = 0; c < 3; c++) marks.add(`${br * 3 + r}-${bc * 3 + c}`);
      }
    }
  }

  const next = board.map((row) => [...row]);
  marks.forEach((key) => {
    const [r, c] = key.split("-").map(Number) as [number, number];
    next[r]![c] = null;
  });

  return { board: next, cleared: [...marks], count };
}

export const COMBO_LABELS = ["NICE!", "GREAT!", "AMAZING!", "SUPER COMBO!", "MEGA COMBO!"];

export function comboLabel(n: number) {
  return COMBO_LABELS[Math.min(n - 1, COMBO_LABELS.length - 1)] ?? "NICE!";
}