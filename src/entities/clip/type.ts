import { ICategory } from '@/shared/types/category';

// 퍼블릭 링크 엔트리 타입
export interface IPublicLinkEntry {
  id: string;
  title: string;
  link: string;
  category: ICategory;
  forkedCount: string;
}
