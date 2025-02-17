import { create } from 'zustand';

interface RememberMeStore {
  rememberMe: boolean;
  setRememberMe: (isOpen: boolean) => void;
}

export const useRememberMeStore = create<RememberMeStore>((set) => ({
  rememberMe: false,
  setRememberMe: (rememberMe) => set({ rememberMe }),
}));
