import { ICategoryResponse } from './category';

interface IBaseClip {
  title: string;
  link: string;
  visible: string;
}

export interface IHomeClip extends IBaseClip {
  id: string;
  forkedCount: string;
  category: ICategoryResponse;
}
