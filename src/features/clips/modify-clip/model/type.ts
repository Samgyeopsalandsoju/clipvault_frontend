import { ICategory } from '@/shared/types';
import { ModalProps } from '@/shared/types/modal';

// modify modal props
export interface ModifyClipProps extends ModalProps {
  clipId: string | null;
  setClipId: (clipId: string | null) => void;
}

// 클립 수정 폼 프롬스
export interface ModifyFormProps {
  id: string;
  title: string;
  link: string;
  visible: string;
  category: ICategory;
}
