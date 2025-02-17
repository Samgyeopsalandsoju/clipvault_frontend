import { create } from 'zustand';

type AuthMode = 'login' | 'register';

interface ModalStore {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

export const useAuthModeStore = create<ModalStore>((set) => ({
  mode: 'login',
  setMode: (mode: AuthMode) => set({ mode }),
}));
