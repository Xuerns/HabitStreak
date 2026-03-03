import { create } from "zustand";
import { fetchApi } from "../service/fetchApi";

interface SummaryStats {
  totalDaysTracked: number;
  overall: number;
  totalHabits: number;
  perfect: number;
  CurrentHabits: number;
}

interface CompletionTrend {
  date: string;
  completef: number;
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

  fetchAnalytics: (period?: number, month?: string) => Promise<void>;
}

export const useAnalyticsStore = create<analyticsState>()((set) => ({
  summaryStats: {
    totalDaysTracked: 0,
    overall: 0,
    totalHabits: 0,
    perfect: 0,
    CurrentHabits: 0,
  },
  completionTrend: [],
  perHabitRate: [],
  monthlyHeatMap: [],
  isLoading: false,

  fetchAnalytics: async (period?: number, month?: string) => {
    set({ isLoading: true });
    try {
      const data = await fetchApi.getAnalytics(period, month);
      set({
        summaryStats: data.summaryStats,
        completionTrend: data.completionTrend,
        perHabitRate: data.perHabitRate,
        monthlyHeatMap: data.monthlyHeatMap,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
