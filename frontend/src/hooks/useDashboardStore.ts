import { create } from "zustand";
import { fetchApi } from "../service/fetchApi";

interface habit {
  id: number;
  title: string;
  description: string;
  is_completed?: boolean;
}

interface topHabit {
  id: number;
  title: string;
  description: string;
  total_completed: number;
}

interface heatMap {
  date: string;
  count: number;
}

interface weeklyChart {
  day: string;
  total: number;
}

interface activityLogs {
  action: "complete" | "undo";
  created_at: string;
  title: string;
}

interface dashboardState {
  // Initial State
  currentStreak: number;
  longestStreak: number;
  totalHabit: number;
  precetage: number;
  remainingTo70: number | string;
  todayHabits: habit[];
  topHabits: topHabit[];
  heatMaps: heatMap[];
  weeklyChart: weeklyChart[];
  activityLogs: activityLogs[];

  // Action
  setCurrentStreak: (streak: number) => void;
  setLongestStreak: (longestStreak: number) => void;
  setTotalHabit: (totalHabit: number) => void;
  setPrecentage: (precentage: number) => void;
  setRemainingTo70: (messagge: number | string) => void;
  setTodayHabits: (habits: habit[]) => void;
  setTopHabits: (habits: topHabit[]) => void;
  setHeatmap: (data: heatMap[]) => void;
  toggleTodayHabits: (id: number) => void;
  setWeeklyChart: (data: weeklyChart[]) => void;
  setActivityLogs: (data: activityLogs[]) => void;
  refreshDashboard: () => Promise<void>;
}

export const useDashboardStore = create<dashboardState>()((set) => ({
  currentStreak: 0,
  longestStreak: 0,
  totalHabit: 0,
  precetage: 0,
  remainingTo70: 70,
  todayHabits: [],
  topHabits: [],
  heatMaps: [],
  weeklyChart: [],
  activityLogs: [],

  setCurrentStreak: (streak: number) => set({ currentStreak: streak }),
  setLongestStreak: (longestStreak: number) =>
    set({ longestStreak: longestStreak }),
  setTotalHabit: (totalHabit: number) => set({ totalHabit: totalHabit }),
  setPrecentage: (precentage: number) => set({ precetage: precentage }),
  setRemainingTo70: (messagge: number | string) =>
    set({ remainingTo70: messagge }),
  setTodayHabits: (habits: habit[]) => set({ todayHabits: habits }),
  setTopHabits: (habits: topHabit[]) => set({ topHabits: habits }),
  setHeatmap: (data: heatMap[]) => set({ heatMaps: data }),
  toggleTodayHabits: (id: number) =>
    set((state) => {
      const updateToday = state.todayHabits.map((item) =>
        item.id === id ? { ...item, is_completed: !item.is_completed } : item,
      );
      const total = updateToday.length;
      const completed = updateToday.filter(
        (habit) => habit.is_completed,
      ).length;
      const newPrecentage = total > 0 ? (completed / total) * 100 : 0;
      const newRemaining = newPrecentage >= 70 ? "Selesai" : 70 - newPrecentage;
      return {
        todayHabits: updateToday,
        precetage: newPrecentage,
        remainingTo70: newRemaining,
      };
    }),
  setWeeklyChart: (data: weeklyChart[]) => set({ weeklyChart: data }),
  setActivityLogs: (data: activityLogs[]) => set({ activityLogs: data }),
  refreshDashboard: async () => {
    const data = await fetchApi.getDashboard();
    set({
      currentStreak: data.streak,
      longestStreak: data.longestStreak,
      totalHabit: data.totalHabit,
      precetage: data.precentage,
      remainingTo70: data.remainingTo70,
      todayHabits: data.todayHabits.map((h: any) => ({
        ...h,
        is_completed: !!h.is_completed,
      })),
      topHabits: data.topHabits,
      heatMaps: data.heatmap,
      weeklyChart: data.weeklyChart,
      activityLogs: data.activitylogs,
    });
  },
}));
