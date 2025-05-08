import { ICategory } from './category';

export interface IClip {
  id: string;
  title: string;
  link: string;
  visible: string;
  forkedCount: string;
  category: ICategory;
}
