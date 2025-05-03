import { create } from 'zustand';
import { ModifyCategoryProps } from './type';

export const useModifyModalStore = create<ModifyCategoryProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  category: null,
  setCategory: (category) => set({ category }),
}));
