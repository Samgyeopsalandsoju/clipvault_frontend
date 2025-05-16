import { ICategory } from '@/shared/data/types';

// 카테고리 선택기 타입
export interface ICategorySelector {
  initialCategory: ICategory | null;
  onChange: (id: string) => void;
  disabled?: boolean;
}
