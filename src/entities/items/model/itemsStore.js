import { create } from "zustand";

const API = import.meta.env.VITE_URL_MOKYNDEV;

export const useFlatsStore = create((set, get) => ({
  flats: [],
  filtered: [],
  loading: false,
  error: null,
  fetchFlats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API}/home`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      set({ flats: data.flats ?? data, filtered: data.flats ?? data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  filterFlats: (filters) => {
    const { flats } = get();
    let result = [...flats];
    if (filters.rooms) result = result.filter(f => f.rooms === filters.rooms);
    if (filters.floorRange) result = result.filter(f => f.floor >= filters.floorRange[0] && f.floor <= filters.floorRange[1]);
    if (filters.areaRange) result = result.filter(f => f.area >= filters.areaRange[0] && f.area <= filters.areaRange[1]);
    if (filters.year) result = result.filter(f => f.completionYear === filters.year);
    set({ filtered: result });
  },
}));
