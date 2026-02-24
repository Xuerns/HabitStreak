import { create } from "zustand";

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

  // Action
  setCurrentStreak: (streak: number) => void;
  setLongestStreak: (longestStreak: number) => void;
  setTotalHabit: (totalHabit: number) => void;
  setPrecentage: (precentage: number) => void;
  setRemainingTo70: (messagge: number | string) => void;
  setTodayHabits: (habits: habit[]) => void;
  setTopHabits: (habits: topHabit[]) => void;
  setHeatmap: (data: heatMap[]) => void;
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
}));
