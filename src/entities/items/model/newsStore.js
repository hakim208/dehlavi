import axios from "axios";
import { create } from "zustand";
const API = import.meta.env.VITE_URL_MOKYNDEV;

export const useNewsStore = create((set) => ({
  news: [],
  projects: [], 
  newsById: null,
  loading: false,
  error: null,

  fetchNews: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get(`${API}/news`);
      set({ news: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchNewsById: async (id) => {
    try {
      set({ loading: true });
      const { data } = await axios.get(`${API}/news/${id}`);
      set({ newsById: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchProjects: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get(`${API}/projects`);
      set({ projects: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));
