import { create } from "zustand";

type LoginState = {
  login: boolean;
  setLogin: () => void;
  setLogOut: () => void;
};

const useLoginStore = create<LoginState>((set) => ({
  login: false,
  setLogin: () => set({ login: true }),
  setLogOut: () => set(() => ({ login: false })),
}));

export default useLoginStore;
