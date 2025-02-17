import { create } from 'zustand';

interface CLipPageOpenStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useClipPageStore = create<CLipPageOpenStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
