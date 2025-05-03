import clsx from 'clsx';
import { ICategoryResponse } from '../types/category';
import { generateModernTagColors } from '../utils';

interface ITagProps extends Omit<ICategoryResponse, 'color'> {
  onClick: () => void;
  color?: string;
}

function Tag({ color = '999', name, onClick }: ITagProps) {
  const { background, text, border } = generateModernTagColors(+color);

  const handleModify = () => {};

  return (
    <p
      className={clsx(
        'py-1 px-1.5 text-sm rounded-lg curser-point w-full text-center font-semibold shadow-md',
        'md:text-sm',
        'border active:scale-[0.97] hover:scale-[1.03]'
      )}
      style={{ background, color: text, borderColor: border }}
      onClick={onClick}
    >
      {name}
    </p>
  );
}

export default Tag;
