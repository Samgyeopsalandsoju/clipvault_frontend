import clsx from 'clsx';
import { useModifyModalStore } from '@/features/category/modify-category/model/store';
import { PenLine } from 'lucide-react';
import { generateModernTagColors } from '@/shared/core/utils/color';
import { ICategory } from '@/shared/data/types';

interface ITagProps extends Omit<ICategory, 'color'> {
  onClick: () => void;
  color?: string;
}

function Tag({ color = '999', name, onClick, id }: ITagProps) {
  const setIsOpen = useModifyModalStore((state) => state.setIsOpen);
  const setCategory = useModifyModalStore((state) => state.setCategory);

  const handleModify = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setCategory({ id, color, name });
  };

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
      {id !== 'all' && (
        <div
          className="absolute right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => handleModify(e)}
        >
          <PenLine size={20} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}

export default Tag;
