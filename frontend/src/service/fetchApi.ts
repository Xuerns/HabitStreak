import { api } from "../lib/axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const withDelay = async <T>(promise: Promise<T>): Promise<T> => {
  const [result] = await Promise.all([promise, delay(2000)])
  return result
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchApi = {
  // Auth
  async register(data: { name: string; gmail: string; password: string }) {
    const res = await api.post("/auth/register", data);
    return withDelay(Promise.resolve(res.data));
  },

  async login(data: { gmail: string; password: string }) {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return withDelay(Promise.resolve(res.data));
  },

  async getProfile() {
    const res = await api.get("/mainpage", {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  // Habits
  async createHabits(data: { title: string; description: string }) {
    const res = await api.post("/habits", data, {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  async gethabits() {
    const res = await api.get("/habits", {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  async updateHabits(data: { title: string; description: string }, id: number) {
    const res = await api.put(`/habits/${id}`, data, {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  async deleteHabits(id: number) {
    const res = await api.delete(`/habits/${id}`, {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  async completeHabits(id: number) {
    const res = await api.post(
      `/habits/${id}/completed`,
      {},
      {
        headers: getAuthHeader(),
      },
    );
    return withDelay(Promise.resolve(res.data));
  },

  async undohabit(id: number) {
    const res = await api.delete(`/habits/${id}/completed`, {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  // Dashboard
  async getDashboard() {
    const res = await api.get("/dashboard", {
      headers: getAuthHeader(),
    });
    return withDelay(Promise.resolve(res.data));
  },

  async getAnalytics(period?: number, month?: string) {
    const res = await api.get("/analytics", {
      headers: getAuthHeader(),
      params: { period, month },
    });
    return withDelay(Promise.resolve(res.data));
  },
};
