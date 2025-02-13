import { ICategoryRequest, ICategoryResponse } from './category';

export type TabType = 'clip' | 'fork';

export type VisibilityType = 'private' | 'public';
export type ClipPopupType = 'detail' | 'edit';

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
  category: ICategoryResponse | ICategoryRequest;
}

export interface IModifyClip extends IBaseClip {
  id: string;
  createdBy: string;
  modifiedBy: string;
  category: ICategoryResponse;
  fork: string;
}

export interface IClipResponse extends ICreateClip {
  id: string;
  createdBy: string;
  fork: string;
}
