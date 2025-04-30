import clsx from 'clsx';
import { Plus } from 'lucide-react';

export const AddCategoryButton = () => {
  return (
    <div
      className={clsx(
        'py-2 px-1.5 text-xs rounded-lg w-full cursor-pointer active:scale-[0.97]',
        'md:text-sm border-2 border-dashed flex items-center justify-center gap-2'
      )}
    >
      <Plus size={20} />
      <div>Create category</div>
    </div>
  );
};
