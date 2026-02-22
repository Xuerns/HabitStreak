import { create } from "zustand";

interface userState {
  name: string;
  gmail: string;
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
