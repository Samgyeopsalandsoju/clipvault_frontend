import clsx from 'clsx';
import { ICategoryResponse } from '../types/category';
import { generateModernTagColors } from '../utils';

interface ITagProps extends Omit<ICategoryResponse, 'color'> {
  onClick: () => void;
  color?: string;
}

function Tag({ color = '999', name, onClick }: ITagProps) {
  const { background, text, border } = generateModernTagColors(+color);
  return (
    <p
      className={clsx(
        'py-1 px-1.5 text-xs rounded-lg curser-point w-full truncate text-center font-semibold shadow-md cursor-pointer',
        'md:text-sm border lg:text-lg active:scale-[0.97] hover:scale-[1.03]'
      )}
      style={{ background, color: text, borderColor: border }}
      onClick={onClick}
    >
      {name}
    </p>
  );
}

export default Tag;
