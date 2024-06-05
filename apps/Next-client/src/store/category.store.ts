import { create } from "zustand";

type categories = {
  _id: string;
  name: string;
  image: string;
};

type categoryState = {
  categories: categories[];
  setCategories: (categories: []) => void;
};

const useCategoryStore = create<categoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories: categories }),
}));

export default useCategoryStore;
