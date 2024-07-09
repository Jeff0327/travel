import { create } from "zustand";

const useStore = create((set) => ({
  selectedRoom: null,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
}));

export default useStore;
