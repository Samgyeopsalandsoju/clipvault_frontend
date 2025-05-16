import { ICategory } from './category';

export interface IClip {
  id: number;
  title: string;
  link: string;
  visible: string;
  forkedCount: number;
  category: ICategory;
}
