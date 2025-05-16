import { IClip } from '@/shared/data/types/clip';
import { create } from 'zustand';
import { ClipListStoreProps, VisibilityType } from './clips.type';

export const useClipListStore = create<ClipListStoreProps>((set, get) => ({
  originalClips: [], // 처음 받아온 모든 클립들
  filteredClips: [], // 필터링된 클립들
  visibility: 'all', // 보여질 클립들의 가시성
  category: 'all', // 카테고리

  // 클립 리스트 설정
  setClips: (clips: IClip[]) => set({ originalClips: clips, filteredClips: clips }),

  // 클립 리스트 필터링
  setVisibility: (visibility: VisibilityType) => {
    set({ visibility });
    //
    get().applyFilters();
  },
  // 카테고리 선택 시 필터링
  setCategory: (category: string) => {
    set({ category });
    // 필터링 적용
    get().applyFilters();
  },

  /** TODO: 로직 이해하기 후 주석 해제 */
  applyFilters: () => {
    const { originalClips, visibility, category } = get();

    // 가시성과 카테고리에 따라 필터링
    const filtered = originalClips.filter((clip) => {
      const matchVisibility = visibility === 'all' || clip.visible === visibility;
      const matchCategory = category === 'all' || clip.category.name === category;
      return matchVisibility && matchCategory;
    });

    // 필터링된 클립들 설정
    set({ filteredClips: filtered });
  },
}));
