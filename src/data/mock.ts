export const player = {
  name: "Aarav Sharma",
  username: "@aarav_kitty",
  email: "aarav.sharma@gmail.com",
  avatar: "🐱",
  level: 12,
  xp: 800,
  xpMax: 1000,
  streak: 7,
  coins: 2450,
  best: 18900,
  gamesPlayed: 214,
  gamesWon: 138,
  highestCombo: 7,
  totalXp: 24800,
  winRate: 64,
};

export const avatars = [
  { id: "kitty", emoji: "🐱", label: "Kitty" },
  { id: "panda", emoji: "🐼", label: "Panda" },
  { id: "fox", emoji: "🦊", label: "Fox" },
  { id: "rabbit", emoji: "🐰", label: "Rabbit" },
  { id: "bear", emoji: "🐻", label: "Bear" },
  { id: "robot", emoji: "🤖", label: "Robot" },
  { id: "wizard", emoji: "🧙", label: "Wizard" },
  { id: "astronaut", emoji: "👨‍🚀", label: "Astronaut" },
];

export const weekDays = [
  { day: "MON", state: "done" },
  { day: "TUE", state: "done" },
  { day: "WED", state: "done" },
  { day: "THU", state: "done" },
  { day: "FRI", state: "today" },
  { day: "SAT", state: "locked" },
  { day: "SUN", state: "locked" },
] as const;

export const liveTournaments = [
  {
    id: "t1",
    name: "Kitty Blitz Cup",
    players: 1284,
    round: "Round 3 of 5",
    time: "12:45",
    prize: "5,000 🪙",
  },
  {
    id: "t2",
    name: "Combo Masters",
    players: 642,
    round: "Round 1 of 3",
    time: "27:10",
    prize: "2,500 🪙",
  },
];

export const upcomingTournaments = [
  { id: "u1", name: "Weekend Whiskers", startsIn: "00:24:15", registered: 320, prize: "3,000 🪙" },
  { id: "u2", name: "Panda Playoffs", startsIn: "04:10:02", registered: 118, prize: "1,200 🪙" },
];

export const myTournaments = [
  { id: "m1", name: "Kitty Blitz Cup", status: "Playing • Rank 14", prize: "5,000 🪙" },
  { id: "m2", name: "Fox Fiesta", status: "Finished • 🥈 Silver", prize: "800 🪙" },
];

export const leaderboard = [
  { rank: 1, name: "Priya R.", avatar: "🦊", score: 42150, prize: "2,500 🪙" },
  { rank: 2, name: "Rahul M.", avatar: "🐼", score: 39880, prize: "1,500 🪙" },
  { rank: 3, name: "Sneha K.", avatar: "🐰", score: 37420, prize: "1,000 🪙" },
  { rank: 4, name: "Amit V.", avatar: "🐻", score: 33100, prize: "400 🪙" },
  { rank: 5, name: "You", avatar: "🐱", score: 31240, prize: "250 🪙" },
  { rank: 6, name: "Neha S.", avatar: "🤖", score: 28770, prize: "150 🪙" },
];

export const feed = [
  { id: "f1", avatar: "🐼", name: "Rahul", text: "achieved a new High Score of 41,220! 🎉", time: "8m", likes: 24 },
  { id: "f2", avatar: "🦊", name: "Priya", text: "won the Official Kitty Cluster Tournament! 🏆", time: "1h", likes: 88 },
  { id: "f3", avatar: "🐻", name: "Amit", text: "completed today's Daily Challenge.", time: "3h", likes: 12 },
  { id: "f4", avatar: "🐱", name: "You", text: "unlocked the 7 Day Streak trophy! 🏅", time: "6h", likes: 41 },
];

export const notifications = [
  { id: "n1", icon: "🏆", text: "You won the Fox Fiesta tournament!", time: "2m" },
  { id: "n2", icon: "🔥", text: "Your 7 day streak is about to expire!", time: "1h" },
  { id: "n3", icon: "🎯", text: "Daily Challenge is ready to play.", time: "4h" },
  { id: "n4", icon: "👥", text: "Rahul sent you a friend request.", time: "1d" },
  { id: "n5", icon: "🏅", text: "You unlocked a new trophy: Combo King.", time: "2d" },
];

export const trophies = [
  { id: "tr1", icon: "🥇", label: "Tournament Champion", tier: "gold", unlocked: true },
  { id: "tr2", icon: "🥈", label: "Runner Up", tier: "silver", unlocked: true },
  { id: "tr3", icon: "🥉", label: "Podium Finish", tier: "bronze", unlocked: true },
  { id: "tr4", icon: "🔥", label: "7 Day Streak", tier: "gold", unlocked: true },
  { id: "tr5", icon: "🎯", label: "Daily Master", tier: "silver", unlocked: true },
  { id: "tr6", icon: "⚡", label: "Combo King", tier: "gold", unlocked: true },
  { id: "tr7", icon: "💎", label: "Perfect Game", tier: "silver", unlocked: false },
  { id: "tr8", icon: "👑", label: "30 Day Streak", tier: "gold", unlocked: false },
];

export const achievements = [
  { id: "a1", label: "First Game", done: true },
  { id: "a2", label: "First Win", done: true },
  { id: "a3", label: "100 Games", done: true },
  { id: "a4", label: "10,000 Points", done: true },
  { id: "a5", label: "Highest Combo x5", done: true },
  { id: "a6", label: "7 Day Streak", done: true },
  { id: "a7", label: "1000 Games", done: false },
  { id: "a8", label: "30 Day Streak", done: false },
  { id: "a9", label: "Tournament Winner", done: true },
  { id: "a10", label: "Daily Challenge Master", done: false },
  { id: "a11", label: "Perfect Game", done: false },
];

export const themes = [
  { id: "classic", label: "Classic Kitty", price: 0, owned: true, colors: ["#f7b995", "#fbf3ec", "#34c77f"] },
  { id: "candy", label: "Candy", price: 500, owned: true, colors: ["#ff9ecd", "#ffe1f0", "#ff6fa5"] },
  { id: "galaxy", label: "Galaxy", price: 900, owned: false, colors: ["#6c5ce7", "#2d2b55", "#a29bfe"] },
  { id: "neon", label: "Neon", price: 1200, owned: false, colors: ["#39ff88", "#101820", "#00e5ff"] },
  { id: "ocean", label: "Ocean", price: 700, owned: false, colors: ["#2d8a9e", "#d7f2f7", "#5cbdb9"] },
  { id: "jungle", label: "Jungle", price: 800, owned: false, colors: ["#2d5a3d", "#dff0d8", "#a0c49d"] },
  { id: "golden", label: "Golden", price: 1500, owned: false, colors: ["#c9a84c", "#fff6dd", "#f0d78c"] },
  { id: "halloween", label: "Halloween", price: 1000, owned: false, colors: ["#ff7518", "#1a1423", "#8e44ad"] },
];

export const dailyRewards = [
  { day: 1, reward: "10 🪙", claimed: true },
  { day: 2, reward: "20 🪙", claimed: true },
  { day: 3, reward: "30 🪙", claimed: true },
  { day: 4, reward: "50 🪙", claimed: true },
  { day: 5, reward: "75 🪙", claimed: false },
  { day: 6, reward: "100 🪙", claimed: false },
  { day: 7, reward: "Premium", claimed: false },
];

export const friends = {
  total: 42,
  online: 8,
  pending: 3,
  list: [
    { id: "fr1", name: "Priya R.", avatar: "🦊", online: true, level: 18 },
    { id: "fr2", name: "Rahul M.", avatar: "🐼", online: true, level: 15 },
    { id: "fr3", name: "Amit V.", avatar: "🐻", online: false, level: 9 },
    { id: "fr4", name: "Sneha K.", avatar: "🐰", online: true, level: 21 },
  ],
};

export const plans = [
  { id: "monthly", label: "Monthly", price: "₹149", note: "billed every month" },
  { id: "yearly", label: "Yearly", price: "₹999", note: "save 44%", best: true },
  { id: "lifetime", label: "Lifetime", price: "₹2,499", note: "one time payment" },
];