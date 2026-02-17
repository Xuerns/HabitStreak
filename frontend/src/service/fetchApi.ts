import { api } from "../lib/axios";

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchApi = {
  // Auth
  async register(data: { name: string; gmail: string; password: string }) {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async login(data: { gmail: string; password: string }) {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  },

  async getProfile() {
    const res = await api.get("/mainpage", {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  // Habits
  async createHabits(data: { title: string; description: string }) {
    const res = await api.post("/habits", data, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async gethabits() {
    const res = await api.get("/habits", {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async updateHabits(data: { title: string; description: string }, id: number) {
    const res = await api.put(`/habits/${id}`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async deleteHabits(id: number) {
    const res = await api.delete(`/habits/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  async completeHabits(id: number) {
    const res = await api.post(`/habits/${id}/completed`, {}, {
      headers: getAuthHeader()
    }) 
    return res.data;
  },

  // Dashboard
  async getDashboard() {
    const res = await api.get("/dashboard", {
      headers: getAuthHeader()
    })
    return res.data
  }
};
