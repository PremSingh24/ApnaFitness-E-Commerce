import { create } from "zustand";
import { addressType } from "common";

type addressState = {
  address: addressType[];
  setAddress: (allAddress: addressType[]) => void;
  addAdress: (newAddress: addressType) => void;
  updateAddress: (_id: any, updatedAddress: addressType) => void;
  removeAddress: (_id: any) => void;
};

const useAddressStore = create<addressState>((set) => ({
  address: [],
  setAddress: (allAddress) => set(() => ({ address: allAddress })),
  addAdress: (newAddress) =>
    set((state) => ({ address: [...state.address, newAddress] })),
  updateAddress: (_id, updatedAddress) =>
    set((state) => ({
      address: state.address.map((address) =>
        address._id === _id ? updatedAddress : address
      ),
    })),
  removeAddress: (_id) =>
    set((state) => ({
      address: state.address.filter((address) => address._id !== _id),
    })),
}));

export default useAddressStore;
