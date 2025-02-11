import { IClipResponse } from '@/types/clip';
import { GitFork } from 'lucide-react';
import classNames from 'classnames';
import { generateModernTagColors } from '@/utils';

export const HomeCard = ({ title, category, link, fork }: IClipResponse) => {
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <div
      className={classNames(
        'cursor-pointer p-4 rounded-lg dark:bg-background.secondaryWithOpacity-dark',
        'backdrop-blur transition-all duration-200',
        'hover:dark:bg-background-secondary-dark'
      )}
      style={{
        borderColor: border,
        borderWidth: '2px',
      }}
    >
      <div className="flex flex-row items-start justify-between gap-[2px]">
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          <div className="flex flex-row item-center gap-4 mb-1">
            <p
              className={classNames(
                'py-1 px-3 text-sm rounded-lg cursor-pointer select-none whitespace-nowrap',
                'truncate max-w-[120px] sm:max-w-[80px]'
              )}
              style={{
                backgroundColor: background,
                color: text,
              }}
            >
              {category.name}
            </p>
            <p className="text-sm font-medium truncate dark:text-text-primary-dark">{title}</p>
          </div>
          <p className="text-[0.75rem] truncate text-[#a1a1aa]">{link}</p>
        </div>
        <div
          className={classNames(
            'dark:text-text-placeholder-dark flex flex-row gap-[10px] items-center justify-center',
            'hover:dark:text-text-primary-dark'
          )}
        >
          <GitFork size={16} /> {fork || 0}
        </div>
      </div>
    </div>
  );
};
