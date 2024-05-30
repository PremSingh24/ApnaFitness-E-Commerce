import { create } from "zustand";
import { productType } from "common";

type productsState = {
  allProducts: productType[];
  setAllProducts: (products: productType[]) => void;
};

const useProductStore = create<productsState>((set) => ({
  allProducts: [],
  setAllProducts: (products) => set(() => ({ allProducts: products })),
}));

export default useProductStore;
