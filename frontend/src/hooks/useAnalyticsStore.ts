import { create } from "zustand";
import { fetchApi } from "../service/fetchApi";

interface SummaryStats {
  totalDaysTracked: number;
  overall: number;
  totalHabits: number;
  perfect: number;
  currentStreak: number;
}

interface CompletionTrend {
  date: string;
  completed: number;
}

interface PerHabitRate {
  id: number;
  title: string;
  completed: number;
  total_days: number;
}

interface MonthlyHeatmap {
  date: string;
  count: number;
}

interface analyticsState {
  summaryStats: SummaryStats;
  completionTrend: CompletionTrend[];
  perHabitRate: PerHabitRate[];
  monthlyHeatMap: MonthlyHeatmap[];
  isLoading: boolean;

  // Track filter state
  currentPeriod: number;
  currentMonth: string; // format: "YYYY-MM"

  fetchAnalytics: (period?: number, month?: string) => Promise<void>;
}

const now = new Date();
const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

export const useAnalyticsStore = create<analyticsState>()((set, get) => ({
  summaryStats: {
    totalDaysTracked: 0,
    overall: 0,
    totalHabits: 0,
    perfect: 0,
    currentStreak: 0,
  },
  completionTrend: [],
  perHabitRate: [],
  monthlyHeatMap: [],
  isLoading: false,

  currentPeriod: 30,
  currentMonth: defaultMonth,

  fetchAnalytics: async (period?: number, month?: string) => {
    // Use provided values or fallback to current stored values
    const resolvedPeriod = period ?? get().currentPeriod;
    const resolvedMonth = month ?? get().currentMonth;

    set({
      isLoading: true,
      currentPeriod: resolvedPeriod,
      currentMonth: resolvedMonth,
    });
    try {
      const data = await fetchApi.getAnalytics(resolvedPeriod, resolvedMonth);
      set({
        summaryStats: data.summaryStats,
        completionTrend: data.completionTrend,
        perHabitRate: data.perHabitRate,
        monthlyHeatMap: data.monthlyHeatMap,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
}));
