import classNames from 'classnames';
import { Pen, Trash2 } from 'lucide-react';

interface NormalModeProps {
  name: string;
  text: string;
  onDelete: () => void;
  onEdit: () => void;
}

export const NormalMode = ({ name, text, onDelete, onEdit }: NormalModeProps) => {
  return (
    <>
      <div
        className={classNames(
          'dark:text-text-primary-dark select-none cursor-pointer',
          'transition-transform duration-300',
          'active:scale-90',
          'hover:rotate-12'
        )}
        style={{ color: text }}
        onClick={onDelete}
      >
        <Trash2 />
      </div>
      <input
        className="dark:text-text-primary-dark select-none bg-transparent w-[50%]"
        style={{ color: text }}
        value={name}
        placeholder="new category"
        disabled
      />
      <div
        className={classNames(
          'dark:text-text-placeholder-dark cursor-pointer hover:dark:text-text-primary-dark select-none',
          'flex justify-center items-center'
        )}
        onClick={onEdit}
      >
        <Pen size={18} />
      </div>
    </>
  );
};
