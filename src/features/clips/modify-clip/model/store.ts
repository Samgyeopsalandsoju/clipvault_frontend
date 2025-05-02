import { create } from 'zustand';
import { ModifyClipProps } from './type';

export const useModifyModalStore = create<ModifyClipProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  clipId: null,
  setClipId: (clipId) => set({ clipId }),
}));
