import { create } from "zustand";
import { productType } from "common";

type productsState = {
  allProducts: productType[];
  products: productType[];
  setAllProducts: (products: productType[]) => void;
  setProducts: (products: productType[]) => void;
};

const useProductStore = create<productsState>((set) => ({
  allProducts: [],
  products: [],
  setAllProducts: (products) => set(() => ({ allProducts: products })),
  setProducts: (products) => set(() => ({ products: products })),
}));

export default useProductStore;
