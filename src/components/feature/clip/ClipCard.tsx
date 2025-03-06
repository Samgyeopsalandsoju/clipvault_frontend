'use client';

import { ExternalLink, Copy, Bookmark } from 'lucide-react';
import { generateModernTagColors, handleCopy, openInNewTab } from '@/utils';
import { IClipResponse } from '@/types/clip';
import classNames from 'classnames';

export const ClipCard = ({ title, category, link, visible, forkedCount }: IClipResponse) => {
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <div className="relative w-full h-[93px] max-w-md mx-auto p-0 hover:scale-[1.01]">
      <div
        className={classNames(
          ' w-full h-full',
          'absolute cursor-pointer p-4 rounded-[0.75rem]',
          'backdrop-blur transition-all duration-200',
          'hover:dark:bg-background-secondary-dark',
          {
            'dark:bg-background-secondaryWithOpacity-dark': !(visible === 'public'),
          }
        )}
        style={{
          backgroundColor: visible === 'public' ? background : undefined,
          borderColor: visible === 'public' ? border : undefined,
          borderWidth: visible === 'public' ? '2px' : undefined,
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-row items-start justify-between gap-[2px]">
          <div className="flex flex-col flex-1 gap-2 min-w-0">
            <div className="flex flex-row items-center gap-4 mb-1">
              <p
                className={classNames(
                  'py-1 px-3 text-sm rounded-lg cursor-pointer select-none whitespace-nowrap',
                  'truncate max-w-[120px] sm:max-w-[80px] '
                )}
                style={{
                  backgroundColor: background,
                  color: text,
                }}
              >
                {category.name}
              </p>
              <p className="text-sm font-medium truncate dark:text-text-primary-dark select-none">{title}</p>
            </div>
            <p className="text-[0.75rem] truncate text-[#a1a1aa] select-none">{link}</p>
          </div>
          <div className="min-w-[32px]">
            <div className="flex flex-row">
              <button
                className={classNames(
                  'rounded-full p-2',
                  'hover:bg-black/[0.04]',
                  'active:bg-black/[0.1]',
                  'dark:hover:bg-white/[0.08]',
                  'dark:active:bg-white/[0.12]',
                  'transition-colors duration-200',
                  'relative overflow-hidden',
                  'disabled:opacity-50',
                  'disabled:pointer-events-none',
                  'inline-flex items-center justify-center',
                  'dark:text-text-primary-dark',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-500',
                  'max-md:opacity-30 '
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(link);
                }}
              >
                <Copy size={16} />
              </button>
              <button
                className={classNames(
                  'rounded-full p-2',
                  'hover:bg-black/[0.04]',
                  'active:bg-black/[0.1]',
                  'dark:hover:bg-white/[0.08]',
                  'dark:active:bg-white/[0.12]',
                  'transition-colors duration-200',
                  'relative overflow-hidden',
                  'disabled:opacity-50',
                  'disabled:pointer-events-none',
                  'inline-flex items-center justify-center',
                  'dark:text-text-primary-dark',
                  'max-md:opacity-30',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-500'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  openInNewTab(link);
                }}
              >
                <ExternalLink size={16} />
              </button>
            </div>
            {visible === 'public' && (
              <div className="flex flex-row opacity-100 w-full justify-end">
                <div className={classNames('dark:text-text-primary-dark p-2 pb-0')}>
                  <Bookmark size={16} fill="currentColor" />
                </div>
                <p
                  className={classNames(
                    'text-[15px] pr-2 pt-2 pb-0 text-center leading-none',
                    'dark:text-text-primary-dark select-none'
                  )}
                >
                  {forkedCount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
