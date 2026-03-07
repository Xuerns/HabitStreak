import { create } from "zustand";

interface habits {
  id: number;
  title: string;
  DESCRIPTION: string;
  is_completed?: boolean;
  create_at: string;
}

interface habitsState {
  // Initial Value
  Habits: habits[];
  isLoading: boolean;
  isFeedback: string;
  feedback: {
    title: string,
    message: string
  };

  // Action
  setIsLoading: (loading: boolean) => void;
  setHabits: (habits: habits[]) => void;
  removeHabit: (id: number) => void;
  updateHabit: (id: number, title: string, DESCRIPTION: string) => void;
  toggleComplete: (id: number, status: boolean) => void;
  setIsFeedback: (type: string) => void;
  setFeedback: (title: string, message: string) => void;
}

export const useHabitsStore = create<habitsState>()((set, get) => ({
  Habits: [],
  todayHabits: [],
  isLoading: true,
  isFeedback: "",
  feedback: {
    title: "",
    message: ""
  },
  setIsLoading: (loading) => set({ isLoading: loading }),
  setHabits: (habits) =>
    set({
      Habits: habits,
    }),
  removeHabit: (id) =>
    set({ Habits: get().Habits.filter((habit) => habit.id !== id) }),
  updateHabit: (id, title, description) =>
    set({
      Habits: get().Habits.map((habit) =>
        habit.id === id ? { ...habit, title, description } : habit,
      ),
    }),
  toggleComplete: (id, status) =>
    set({
      Habits: get().Habits.map((habit) =>
        habit.id === id ? { ...habit, is_completed: status } : habit,
      ),
    }),
    setIsFeedback: (type: string) => set({isFeedback: type}),
    setFeedback: (title: string, message: string) => set({feedback: {title, message}})
}));
