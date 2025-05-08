import clsx from 'clsx';
import { useModifyModalStore } from '@/features/category/modify-category/model/store';
import { PenLine } from 'lucide-react';
import { ICategoryResponse } from '@/shared/data/types';
import { generateModernTagColors } from '@/shared/utils/color';
interface ITagProps extends Omit<ICategoryResponse, 'color'> {
  onClick: () => void;
  color?: string;
}

function Tag({ color = '999', name, onClick, id }: ITagProps) {
  const setIsOpen = useModifyModalStore((state) => state.setIsOpen);
  const setCategory = useModifyModalStore((state) => state.setCategory);

  const { text } = generateModernTagColors(color);

  const handleModify = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setCategory({ id, color, name });
  };

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
      {id !== 'all' && (
        <div
          className="absolute right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => handleModify(e)}
        >
          <PenLine size={20} style={{ color: text }} />
        </div>
      )}
    </div>
  );
}

export default Tag;
