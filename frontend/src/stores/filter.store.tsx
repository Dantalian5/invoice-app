import { create } from "zustand";

export type Filter = "paid" | "pending" | "draft";

interface FilterState {
  filters: Filter[];
  toggleFilter: (value: Filter) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: [],
  toggleFilter: (value: Filter) => {
    set((state) => {
      if (state.filters.includes(value)) {
        return { filters: state.filters.filter((filter) => filter !== value) };
      }
      return { filters: [...state.filters, value] };
    });
  },
}));
export default useFilterStore;
