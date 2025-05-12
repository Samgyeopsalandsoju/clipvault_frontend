import clsx from 'clsx';
import { generateModernTagColors } from '@/shared/core/utils/color';
import { ICategory } from '@/shared/data/types';

interface ITagProps extends Omit<ICategory, 'color'> {
  onClick: () => void;
  color?: string;
}

export const ShareTag = ({ color = '999', name, onClick, id }: ITagProps) => {
  const { text } = generateModernTagColors(color);

  return (
    <div
      className={clsx(
        'py-1 px-1.5 text-sm rounded-lg curser-point w-full font-semibold shadow-md border',
        'md:text-sm',
        'flex justify-center relative items-center group cursor-pointer'
      )}
      style={{ backgroundColor: color, color: text }}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
