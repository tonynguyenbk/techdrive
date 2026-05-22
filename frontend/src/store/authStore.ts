import { create } from "zustand";

interface AuthStore {
  dialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  dialogOpen: false,
  openDialog: () => set({ dialogOpen: true }),
  closeDialog: () => set({ dialogOpen: false }),
}));
