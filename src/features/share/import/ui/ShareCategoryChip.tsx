import { ICategory } from '@/shared/data/types';
import { BasicChip } from '@/shared/ui/category/BasicChip';

interface ITagProps extends Omit<ICategory, 'color'> {
  onClick: () => void;
  color?: string;
  showEditButton: boolean;
}

export const ShareCategoryChip = ({ color, name, onClick }: ITagProps) => {
  return <BasicChip name={name} color={color} onClick={onClick} showEditButton={false} />;
};
