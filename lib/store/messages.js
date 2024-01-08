import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  actionMessage: undefined,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
}));
