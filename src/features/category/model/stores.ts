import { create } from 'zustand';
import { ModifyCategoryProps } from './types';

export const useModifyCategoryModalStore = create<ModifyCategoryProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  category: null,
  setCategory: (category) => set({ category }),
}));
