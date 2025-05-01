import { ICategory } from '@/shared/types';

// 카테고리 선택기 타입
export interface ICategorySelector {
  categoryId: string | null;
  onChange: (categoryId: string) => void;
  disabled?: boolean;
}
