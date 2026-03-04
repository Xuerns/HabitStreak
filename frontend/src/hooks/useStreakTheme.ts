import { useDashboardStore } from "./useDashboardStore";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface StreakTheme {
  level: Level;
  // Text
  primary: string;
  primaryDark: string;
  // Backgrounds
  primaryBg: string;
  accentLight: string;
  accentMedium: string;
  // Gradient
  gradient: string;
  gradientBg: string;
  // Interactive
  ring: string;
  focusRing: string;
  border: string;
  shadow: string;
  hoverBg: string;
  hoverText: string;
  // Fill (icons)
  fill: string;
  // Sidebar active
  activeBg: string;
  activeShadow: string;
  // Heatmap
  heatmapColors: [string, string, string, string];
  hoverRing: string;
  // Hex values for charts
  primaryHex: string;
  secondaryHex: string;
  // Badge
  badgeBg: string;
  badgeText: string;
  // Checkbox completed
  checkboxCompleted: string;
  checkboxRing: string;
  checkboxShadow: string;
  checkboxHoverRing: string;
  // Completed badge
  completedBadgeBg: string;
  completedBadgeText: string;
  // Weekly chart bar colors (7 shades light→dark)
  chartBarColors: [string, string, string, string, string, string, string];
  // Daily progress ring
  progressFaded: string;
  progressVivid: string;
  progressBadgeVivid: string;
}

const themeMap: Record<Level, StreakTheme> = {
  1: {
    level: 1,
    primary: "text-amber-500",
    primaryDark: "text-amber-800",
    primaryBg: "bg-amber-500",
    accentLight: "bg-amber-50",
    accentMedium: "bg-amber-100",
    gradient: "from-amber-400 to-orange-500",
    gradientBg: "bg-linear-to-br from-amber-400 to-orange-500",
    ring: "ring-amber-400",
    focusRing: "focus:ring-amber-400/50 focus:border-amber-400",
    border: "border-amber-400",
    shadow: "shadow-amber-500/20",
    hoverBg: "hover:bg-amber-50/30",
    hoverText: "group-hover:text-amber-600",
    fill: "fill-amber-400",
    activeBg: "bg-amber-500/15 text-amber-400 shadow-sm shadow-amber-500/10",
    activeShadow: "shadow-amber-500/10",
    heatmapColors: [
      "bg-amber-200",
      "bg-amber-300",
      "bg-amber-400",
      "bg-amber-500",
    ],
    hoverRing: "hover:ring-amber-400/50",
    primaryHex: "#F59E0B",
    secondaryHex: "#FDE68A",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-600",
    checkboxCompleted: "bg-linear-to-br from-amber-400 to-orange-500",
    checkboxRing: "ring-amber-300",
    checkboxShadow: "shadow-amber-200",
    checkboxHoverRing: "group-hover:ring-amber-400",
    completedBadgeBg: "bg-amber-100",
    completedBadgeText: "text-amber-600",
    chartBarColors: [
      "#FEF3C7",
      "#FDE68A",
      "#FCD34D",
      "#FBBF24",
      "#F59E0B",
      "#D97706",
      "#B45309",
    ],
    progressFaded: "text-amber-300",
    progressVivid: "text-amber-600",
    progressBadgeVivid: "text-amber-700 bg-amber-100",
  },
  2: {
    level: 2,
    primary: "text-amber-600",
    primaryDark: "text-orange-800",
    primaryBg: "bg-amber-600",
    accentLight: "bg-orange-50",
    accentMedium: "bg-orange-100",
    gradient: "from-amber-500 to-orange-600",
    gradientBg: "bg-linear-to-br from-amber-500 to-orange-600",
    ring: "ring-orange-400",
    focusRing: "focus:ring-orange-400/50 focus:border-orange-400",
    border: "border-orange-400",
    shadow: "shadow-orange-500/20",
    hoverBg: "hover:bg-orange-50/30",
    hoverText: "group-hover:text-orange-600",
    fill: "fill-orange-400",
    activeBg: "bg-orange-500/15 text-orange-400 shadow-sm shadow-orange-500/10",
    activeShadow: "shadow-orange-500/10",
    heatmapColors: [
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-500",
    ],
    hoverRing: "hover:ring-orange-400/50",
    primaryHex: "#D97706",
    secondaryHex: "#FDBA74",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-600",
    checkboxCompleted: "bg-linear-to-br from-amber-500 to-orange-600",
    checkboxRing: "ring-orange-300",
    checkboxShadow: "shadow-orange-200",
    checkboxHoverRing: "group-hover:ring-orange-400",
    completedBadgeBg: "bg-orange-100",
    completedBadgeText: "text-orange-600",
    chartBarColors: [
      "#FFEDD5",
      "#FED7AA",
      "#FDBA74",
      "#FB923C",
      "#F97316",
      "#EA580C",
      "#C2410C",
    ],
    progressFaded: "text-orange-300",
    progressVivid: "text-orange-600",
    progressBadgeVivid: "text-orange-700 bg-orange-100",
  },
  3: {
    level: 3,
    primary: "text-orange-600",
    primaryDark: "text-orange-900",
    primaryBg: "bg-orange-600",
    accentLight: "bg-orange-50",
    accentMedium: "bg-red-100",
    gradient: "from-orange-500 to-red-600",
    gradientBg: "bg-linear-to-br from-orange-500 to-red-600",
    ring: "ring-orange-500",
    focusRing: "focus:ring-orange-500/50 focus:border-orange-500",
    border: "border-orange-500",
    shadow: "shadow-orange-600/20",
    hoverBg: "hover:bg-orange-50/30",
    hoverText: "group-hover:text-orange-700",
    fill: "fill-orange-500",
    activeBg: "bg-orange-500/15 text-orange-400 shadow-sm shadow-orange-500/10",
    activeShadow: "shadow-orange-500/10",
    heatmapColors: [
      "bg-orange-200",
      "bg-orange-300",
      "bg-orange-400",
      "bg-orange-600",
    ],
    hoverRing: "hover:ring-orange-500/50",
    primaryHex: "#EA580C",
    secondaryHex: "#FB923C",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
    checkboxCompleted: "bg-linear-to-br from-orange-500 to-red-600",
    checkboxRing: "ring-orange-400",
    checkboxShadow: "shadow-orange-200",
    checkboxHoverRing: "group-hover:ring-orange-500",
    completedBadgeBg: "bg-orange-100",
    completedBadgeText: "text-orange-600",
    chartBarColors: [
      "#FFF7ED",
      "#FFEDD5",
      "#FED7AA",
      "#F97316",
      "#EA580C",
      "#C2410C",
      "#9A3412",
    ],
    progressFaded: "text-orange-300",
    progressVivid: "text-orange-700",
    progressBadgeVivid: "text-orange-800 bg-orange-100",
  },
  4: {
    level: 4,
    primary: "text-red-600",
    primaryDark: "text-red-800",
    primaryBg: "bg-red-600",
    accentLight: "bg-red-50",
    accentMedium: "bg-red-100",
    gradient: "from-red-500 to-pink-700",
    gradientBg: "bg-linear-to-br from-red-500 to-pink-700",
    ring: "ring-red-400",
    focusRing: "focus:ring-red-400/50 focus:border-red-400",
    border: "border-red-400",
    shadow: "shadow-red-500/20",
    hoverBg: "hover:bg-red-50/30",
    hoverText: "group-hover:text-red-600",
    fill: "fill-red-500",
    activeBg: "bg-red-500/15 text-red-400 shadow-sm shadow-red-500/10",
    activeShadow: "shadow-red-500/10",
    heatmapColors: ["bg-red-200", "bg-red-300", "bg-red-400", "bg-red-600"],
    hoverRing: "hover:ring-red-400/50",
    primaryHex: "#DC2626",
    secondaryHex: "#FCA5A5",
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
    checkboxCompleted: "bg-linear-to-br from-red-500 to-pink-700",
    checkboxRing: "ring-red-300",
    checkboxShadow: "shadow-red-200",
    checkboxHoverRing: "group-hover:ring-red-400",
    completedBadgeBg: "bg-red-100",
    completedBadgeText: "text-red-600",
    chartBarColors: [
      "#FEE2E2",
      "#FECACA",
      "#FCA5A5",
      "#F87171",
      "#EF4444",
      "#DC2626",
      "#B91C1C",
    ],
    progressFaded: "text-red-300",
    progressVivid: "text-red-700",
    progressBadgeVivid: "text-red-700 bg-red-100",
  },
  5: {
    level: 5,
    primary: "text-pink-600",
    primaryDark: "text-pink-800",
    primaryBg: "bg-pink-600",
    accentLight: "bg-pink-50",
    accentMedium: "bg-fuchsia-100",
    gradient: "from-pink-500 to-violet-600",
    gradientBg: "bg-linear-to-br from-pink-500 to-violet-600",
    ring: "ring-pink-400",
    focusRing: "focus:ring-pink-400/50 focus:border-pink-400",
    border: "border-pink-400",
    shadow: "shadow-pink-500/20",
    hoverBg: "hover:bg-pink-50/30",
    hoverText: "group-hover:text-pink-600",
    fill: "fill-pink-500",
    activeBg: "bg-pink-500/15 text-pink-400 shadow-sm shadow-pink-500/10",
    activeShadow: "shadow-pink-500/10",
    heatmapColors: ["bg-pink-200", "bg-pink-300", "bg-pink-400", "bg-pink-600"],
    hoverRing: "hover:ring-pink-400/50",
    primaryHex: "#DB2777",
    secondaryHex: "#F9A8D4",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-600",
    checkboxCompleted: "bg-linear-to-br from-pink-500 to-violet-600",
    checkboxRing: "ring-pink-300",
    checkboxShadow: "shadow-pink-200",
    checkboxHoverRing: "group-hover:ring-pink-400",
    completedBadgeBg: "bg-pink-100",
    completedBadgeText: "text-pink-600",
    chartBarColors: [
      "#FCE7F3",
      "#FBCFE8",
      "#F9A8D4",
      "#F472B6",
      "#EC4899",
      "#DB2777",
      "#BE185D",
    ],
    progressFaded: "text-pink-300",
    progressVivid: "text-pink-700",
    progressBadgeVivid: "text-pink-700 bg-pink-100",
  },
  6: {
    level: 6,
    primary: "text-violet-600",
    primaryDark: "text-violet-800",
    primaryBg: "bg-violet-600",
    accentLight: "bg-violet-50",
    accentMedium: "bg-violet-100",
    gradient: "from-violet-500 to-indigo-600",
    gradientBg: "bg-linear-to-br from-violet-500 to-indigo-600",
    ring: "ring-violet-400",
    focusRing: "focus:ring-violet-400/50 focus:border-violet-400",
    border: "border-violet-400",
    shadow: "shadow-violet-500/20",
    hoverBg: "hover:bg-violet-50/30",
    hoverText: "group-hover:text-violet-600",
    fill: "fill-violet-500",
    activeBg: "bg-violet-500/15 text-violet-400 shadow-sm shadow-violet-500/10",
    activeShadow: "shadow-violet-500/10",
    heatmapColors: [
      "bg-violet-200",
      "bg-violet-300",
      "bg-violet-400",
      "bg-violet-600",
    ],
    hoverRing: "hover:ring-violet-400/50",
    primaryHex: "#7C3AED",
    secondaryHex: "#C4B5FD",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-600",
    checkboxCompleted: "bg-linear-to-br from-violet-500 to-indigo-600",
    checkboxRing: "ring-violet-300",
    checkboxShadow: "shadow-violet-200",
    checkboxHoverRing: "group-hover:ring-violet-400",
    completedBadgeBg: "bg-violet-100",
    completedBadgeText: "text-violet-600",
    chartBarColors: [
      "#EDE9FE",
      "#DDD6FE",
      "#C4B5FD",
      "#A78BFA",
      "#8B5CF6",
      "#7C3AED",
      "#6D28D9",
    ],
    progressFaded: "text-violet-300",
    progressVivid: "text-violet-700",
    progressBadgeVivid: "text-violet-700 bg-violet-100",
  },
};

const levels: { min: number; level: Level }[] = [
  { min: 200, level: 6 },
  { min: 100, level: 5 },
  { min: 50, level: 4 },
  { min: 20, level: 3 },
  { min: 10, level: 2 },
  { min: 1, level: 1 },
];

function getLevel(streak: number): Level {
  return levels.find((l) => streak >= l.min)?.level ?? 1;
}

export function useStreakTheme(): StreakTheme {
  const { currentStreak } = useDashboardStore();
  const level = getLevel(currentStreak);
  return themeMap[level];
}
