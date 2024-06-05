import { create } from "zustand";

type allFilterStateType = {
  priceRange: number[];
  rating: number;
  removeOutOfStock: boolean;
  fastDeliveryOnly: boolean;
};

type filterState = {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  priceRange: number[];
  setPriceRange: (priceRange: number[]) => void;
  rating: number;
  setRating: (rating: number) => void;
  removeOutOfStock: boolean;
  setRemoveOutOfStock: (removeOutOfStock: boolean) => void;
  fastDeliveryOnly: boolean;
  setFastDeliveryOnly: (fastDeliveryOnly: boolean) => void;
  setAllFilters: (allFilterState: allFilterStateType) => void;
  resetAllFilters: () => void;
};

const useFilterStore = create<filterState>((set) => ({
  sortBy: "",
  setSortBy: (sortBy) => set(() => ({ sortBy: sortBy })),
  priceRange: [0, 10000],
  setPriceRange: (priceRange) => set(() => ({ priceRange: priceRange })),
  rating: 1,
  setRating: (rating) => set(() => ({ rating: rating })),
  removeOutOfStock: false,
  setRemoveOutOfStock: (removeOutOfStock) =>
    set(() => ({ removeOutOfStock: removeOutOfStock })),
  fastDeliveryOnly: false,
  setFastDeliveryOnly: (fastDeliveryOnly) =>
    set(() => ({ fastDeliveryOnly: fastDeliveryOnly })),
  setAllFilters: (allFilterState) =>
    set(() => ({
      priceRange: allFilterState.priceRange,
      rating: allFilterState.rating,
      removeOutOfStock: allFilterState.removeOutOfStock,
      fastDeliveryOnly: allFilterState.fastDeliveryOnly,
    })),
  resetAllFilters: () =>
    set(() => ({
      sortBy: "",
      priceRange: [0, 10000],
      rating: 1,
      removeOutOfStock: false,
      fastDeliveryOnly: false,
    })),
}));

export default useFilterStore;
