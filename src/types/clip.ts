import { ICategoryRequest, ICategoryResponse } from './category';

export type TabType = 'clip' | 'fork';
export type VisibilityType = 'private' | 'public';

export interface ICurrentTabProps {
  currentTab: TabType;
  onTabChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IBaseClip {
  title: string;
  link: string;
  visible: string;
}

export interface ICreateClip extends IBaseClip {
  category: ICategoryRequest;
}

export interface IModifyClip extends IBaseClip {
  id: string;
  category: ICategoryRequest;
}

export interface IClipResponse extends IBaseClip {
  id: string;
  forkedCount: string;
  category: ICategoryResponse;
}
