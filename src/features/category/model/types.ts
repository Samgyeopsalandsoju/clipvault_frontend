import { ICategory } from '@/shared/data/types';

// 카테고리 칩
export interface ICategoryChipProps extends ICategory {
  showEditButton: boolean;
}

// 카티고리 폼
export interface ICategoryForm extends ICategory {}

// 카테고리 수정 컴포넌트 props
export interface ModifyCategoryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: ICategory | null;
  setCategory: (category: ICategory | null) => void;
}

// 카테고리 선택기 타입
export interface ICategorySelectorProps {
  initialCategory: ICategory | null;
  onChange: (id: string) => void;
  disabled?: boolean;
}
