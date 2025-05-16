import clsx from 'clsx';
import { ICategory } from '@/shared/data/types';

interface ITagProps extends Omit<ICategory, 'color'> {
  onClick: () => void;
  color?: string;
}

export const ShareTag = ({ color = '999', name, onClick }: ITagProps) => {
  return (
    <div
      className={clsx(
        'py-2 px-3 text-sm rounded-lg w-full font-semibold shadow-md border',
        'md:text-sm',
        'flex justify-center relative items-center group cursor-pointer'
      )}
      style={{
        backgroundColor: color === '999' ? '#fff' : color,
        color: color === '999' ? '#000' : '#fff',
      }}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
