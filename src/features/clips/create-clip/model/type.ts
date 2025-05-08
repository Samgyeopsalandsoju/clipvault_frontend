import { ICategory } from '@/shared/data/types';

export interface ICreateForm {
  title: string;
  link: string;
  visible: string;
  category: ICategory;
}
