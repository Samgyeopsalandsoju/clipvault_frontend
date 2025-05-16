import { ICategory } from '@/shared/data/types';
import { ModalProps } from '@/shared/data/types/modal';

// modify modal props
export interface ModifyClipProps extends ModalProps {
  clipId: number | null;
  setClipId: (clipId: number | null) => void;
}

// 클립 수정 폼 프롬스
export interface ModifyFormProps {
  id: number;
  title: string;
  link: string;
  visible: string;
  category: ICategory;
}
