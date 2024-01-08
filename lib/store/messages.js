import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
}));
