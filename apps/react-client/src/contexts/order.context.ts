import { orderType } from "common";
import { create } from "zustand";

type orderState = {
  orders: orderType[] | [];
  setOrders: (orders: orderType[]) => void;
};

const useOrderStore = create<orderState>((set) => ({
  orders: [],
  setOrders: (orders) => set(() => ({ orders: orders })),
}));

export default useOrderStore;
