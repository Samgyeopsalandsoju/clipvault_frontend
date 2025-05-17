import { create } from 'zustand';
import { IModifyClipStore } from './types';

export const useModifyClipModalStore = create<IModifyClipStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  clipId: null,
  setClipId: (clipId) => set({ clipId }),
}));
