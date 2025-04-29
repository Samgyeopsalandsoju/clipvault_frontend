import { create } from 'zustand';

interface AuthModalStore {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  onLoginModalOpen: () => void;
  onLoginModalClose: () => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  onLoginModalOpen: () => set({ isLoginModalOpen: true }),
  onLoginModalClose: () => set({ isLoginModalOpen: false }),
}));
