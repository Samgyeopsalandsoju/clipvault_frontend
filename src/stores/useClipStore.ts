import { IClipResponse } from '@/types';
import { create } from 'zustand';

interface ClipStore {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (categoryId: string) => void;
  getFilteredClips: (clips: IClipResponse[]) => IClipResponse[];
}

export const useClipStore = create<ClipStore>((set, get) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (categoryId: string) => set({ selectedCategoryId: categoryId }),
  getFilteredClips: (clips: IClipResponse[]): IClipResponse[] => {
    const selectedCategoryId = get().selectedCategoryId;

    if (!selectedCategoryId) return clips;
    return clips.filter((clip) => clip.category.id === selectedCategoryId);
  },
}));
