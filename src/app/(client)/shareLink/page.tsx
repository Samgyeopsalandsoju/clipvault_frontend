import classNames from 'classnames';
import { Trash2, Copy, ExternalLink } from 'lucide-react';

const shareLink = () => {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="pb-4 pl-2">
        <p className="text-[0.9rem] select-none dark:text-text-placeholder-dark">
          Your clips, all neatly gathered here... take a look.
        </p>
      </div>
      <div className="gap-4">
        <div className="flex gap-[10px]">
          <button className="border-solid border-[#f44336] rounded-[8px] p-[10px] text-[#f44336] dark:bg-background-secondary-dark active:scale-[0.97]">
            <Trash2 size={16} />
          </button>
          <input
            className={classNames(
              'flex flex-1 h-[40px] rounded-[8px] p-[10px] border-solid dark:border-border-focus-dark',
              'dark:text-text-primary-dark dark:bg-background-secondary-dark'
            )}
            readOnly
          />
          <button className="border-solid dark:border-border-focus-dark rounded-[8px] p-[10px] dark:text-text-primary-dark dark:bg-background-secondary-dark active:scale-[0.97]">
            <Copy size={16} />
          </button>
          <button className="border-solid dark:border-border-focus-dark rounded-[8px] p-[10px] dark:text-text-primary-dark dark:bg-background-secondary-dark active:scale-[0.97]">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default shareLink;
