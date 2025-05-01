import { ICategory } from '@/shared/types';

export interface ICreateForm {
  title: string;
  link: string;
  visible: string;
  category: ICategory;
}
