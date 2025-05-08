import { ICategory } from '@/shared/data/types';

export interface ModifyCategoryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: ICategory | null;
  setCategory: (category: ICategory | null) => void;
}
