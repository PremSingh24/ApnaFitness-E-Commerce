import { create } from "zustand";

type userType = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
};

type userState = {
  user: userType;
  setUser: (user: userType) => void;
};

const useUserStore = create<userState>((set) => ({
  user: { firstName: "", lastName: "", mobile: "", email: "" },
  setUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
