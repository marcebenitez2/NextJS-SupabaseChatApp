import { create } from "zustand";

export const useMessage = create((set) => ({
  messages: [],
}));
