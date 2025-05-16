import clsx from 'clsx';
import { PenLine } from 'lucide-react';

export interface BasicTagProps {
  id: string;
  name: string;
  color?: string;
  onClick?: () => void;
  showEditButton?: boolean;
  onEditClick?: (e: React.MouseEvent) => void;
}

export const CategoryChip = ({ name, color, onClick, onEditClick, showEditButton }: BasicTagProps) => {
  const handleEditClick = (e: React.MouseEvent) => {
    if (onEditClick) {
      e.preventDefault();
      e.stopPropagation();
      onEditClick(e);
    }
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
      {showEditButton && (
        <div
          className="absolute right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={handleEditClick}
        >
          <PenLine size={20} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};
