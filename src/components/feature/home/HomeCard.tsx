'use client';

import { IClipResponse } from '@/types/clip';
import { Bookmark, Copy, ExternalLink } from 'lucide-react';
import classNames from 'classnames';
import { generateModernTagColors, handleCopy, openInNewTab } from '@/utils';
import { useState } from 'react';

interface HomeCardProps extends IClipResponse {
  onFork: (clipId: string) => void;
  isForking: boolean;
}

export const HomeCard = ({ id, title, category, link, forkedCount, isForking, onFork }: HomeCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [forkCount, setForkCount] = useState(forkedCount);
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <div className="relative w-full h-[93px] max-w-md mx-auto p-0 hover:scale-[1.03]">
      <div
        className="relative  w-full h-full cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="absolute w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : '',
          }}
        >
          {/** front side */}
          <div
            className={classNames(
              ' w-full h-full',
              'absolute cursor-pointer p-4 rounded-[0.75rem]',
              'backdrop-blur transition-all duration-200',
              'hover:dark:bg-background-secondary-dark'
            )}
            style={{
              backgroundColor: background,
              borderColor: border,
              borderWidth: '2px',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex flex-row items-start justify-between gap-[2px] h-full">
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
              <div className="min-w-[64px] h-full flex flex-col justify-end ">
                <div className="flex flex-row w-full justify-end">
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
                <div
                  className="flex flex-row opacity-50 hover:opacity-100 w-full justify-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFork(id);
                  }}
                >
                  <div className={classNames('dark:text-text-primary-dark p-2 pb-0')}>
                    <Bookmark size={16} />
                  </div>
                  <p
                    className={classNames(
                      'text-[15px] pr-2 pt-2 pb-0 text-center leading-none',
                      'dark:text-text-primary-dark select-none'
                    )}
                  >
                    {forkCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'absolute w-full h-full p-4 rounded-[0.75rem] dark:bg-background-primary-dark flex items-center justify-center',
              'dark:text-text-primary-dark'
            )}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: border,
              borderWidth: '2px',
              backgroundColor: background,
            }}
          >
            <span className="text-2xl font-bold tracking-tight select-none">clipVault</span>
          </div>
        </div>
      </div>
    </div>
  );
};
