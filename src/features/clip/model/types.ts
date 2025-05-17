import { ICategory, IClip } from '@/shared/data/types';
import { ModalProps } from '@/shared/data/types/modal';

// modify modal props
export interface IModifyClipStore extends ModalProps {
  clipId: number | null;
  setClipId: (clipId: number | null) => void;
}

// 클립 수정 폼
export interface IModifyForm {
  id: number;
  title: string;
  link: string;
  visible: string;
  category: ICategory;
}
// 클립 생성 폼
export type IClipForm = Omit<IClip, 'id' | 'forkedCount'>;
