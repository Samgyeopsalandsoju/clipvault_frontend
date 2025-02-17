import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
