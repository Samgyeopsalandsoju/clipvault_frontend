import { ICategory } from '@/shared/types/category';

// 퍼블릭 링크 엔트리 타입
export interface IClipEntry {
  id: string;
  title: string;
  link: string;
  category: ICategory;
  forkedCount: string;
}

// 공개범위 셀렉터
export interface IVisibilitySelector {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
