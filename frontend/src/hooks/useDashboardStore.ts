import { create } from "zustand";

interface habitState {
    // Initial State
    currentStreak: number;
    longestStreak: number;
    totalHabit: number;
    precetage: number;
    remainingTo70: number | string;

    // Action
    setCurrentStreak: (streak: number) => void;
    setLongestStreak: (longestStreak: number) => void;
    setTotalHabit: (totalHabit: number) => void;
    setPrecentage: (precentage: number) => void;
    setRemainingTo70: (messagge: number | string) => void;
}

export const useDashboardStore = create<habitState>()((set) => ({
    currentStreak: 0,
    longestStreak: 0,
    totalHabit: 0,
    precetage: 0,
    remainingTo70: 70,

    setCurrentStreak: (streak: number) => set({currentStreak: streak}),
    setLongestStreak: (longestStreak: number) => set({longestStreak: longestStreak}),
    setTotalHabit: (totalHabit: number) => set({totalHabit: totalHabit}),
    setPrecentage: (precentage: number) => set({precetage: precentage}),
    setRemainingTo70: (messagge: number | string) => set({remainingTo70: messagge})
}))