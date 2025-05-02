import { IUserClip } from '@/shared/types/clip';

export interface ClipListStoreProps {
  originalClips: IUserClip[]; // 필터 전 원본 데이터
  filteredClips: IUserClip[]; // 현재 필터링된 리스트

  visibility: VisibilityType; // 현재 선택된 visibility
  category: string;

  setClips: (clips: IUserClip[]) => void;
  setVisibility: (visibility: VisibilityType) => void;
  setCategory: (category: string) => void;
  applyFilters: () => void;
}

export type VisibilityType = 'all' | 'public' | 'private';
