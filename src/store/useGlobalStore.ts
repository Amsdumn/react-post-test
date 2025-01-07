import { create } from "zustand";

interface GlobalState {
  status: boolean;
  setStatus: (newStatus: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  status: false,
  setStatus: (newStatus: boolean) => set({ status: newStatus }),
}));

export default useGlobalStore;
