import { create } from "zustand";

interface userState {
  // Initial State
  name: string;
  gmail: string;

  // Action
  setUser: (name: string, gmail: string) => void;
  clearUser: () => void;
}

export const useUsersStore = create<userState>()((set) => ({
  // Profile / User
  name: "",
  gmail: "",
  setUser: (name: string, gmail: string) => set({ name: name, gmail: gmail }),
  clearUser: () => set({ name: "", gmail: "" }),

  // habits
}));
