import { ICategory } from '@/shared/types/category';

export interface IPublicLinkEntry {
  id: string;
  title: string;
  link: string;
  category: ICategory;
}
