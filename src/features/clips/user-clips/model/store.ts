import { IUserClip } from '@/shared/types/clip';
import { create } from 'zustand';
import { ClipListStoreProps, VisibilityType } from './type';
import { ICategory } from '@/shared/types/category';

export const useClipListStore = create<ClipListStoreProps>((set, get) => ({
  originalClips: [], // 처음 받아온 모든 클립들
  filteredClips: [],
  visibility: 'all',
  category: { color: '999', name: 'all', id: 'id' },

  setClips: (clips: IUserClip[]) => set({ originalClips: clips, filteredClips: clips }),

  setVisibility: (visibility: VisibilityType) => {
    set({ visibility });
    get().applyFilters();
  },

  setCategory: (category: ICategory) => {
    set({ category });
    get().applyFilters();
  },

  applyFilters: () => {
    const { originalClips, visibility, category } = get();

    const filtered = originalClips.filter((clip) => {
      const matchVisibility = visibility === 'all' || clip.visible === visibility;
      const matchCategory = category.id === 'all' || clip.category.id === category.id;
      return matchVisibility && matchCategory;
    });

    set({ filteredClips: filtered });
  },
}));
