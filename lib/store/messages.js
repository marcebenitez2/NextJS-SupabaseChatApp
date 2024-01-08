import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,
  setOptimisticIds: (id) =>
    set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
      optimisticIds: [...state.optimisticIds, newMessage.id],
    })),
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),
  optimisticUpdateMessage: (updateMessage) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === updateMessage.id) {
            message.text = updateMessage.text;
            message.is_edit = updateMessage.is_edit;
          }
          return message;
        }),
      };
    }),
}));
