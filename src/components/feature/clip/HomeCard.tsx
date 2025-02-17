'use client';

import { IClipResponse } from '@/types/clip';
import { GitFork } from 'lucide-react';
import classNames from 'classnames';
import { generateModernTagColors } from '@/utils';
import { useState } from 'react';

export const HomeCard = ({ title, category, link, forkedCount }: IClipResponse) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <div className="relative w-full h-[100px] max-w-md mx-auto p-0">
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
              'absolute cursor-pointer p-4 rounded-lg dark:bg-background.secondaryWithOpacity-dark',
              'backdrop-blur transition-all duration-200',
              'hover:dark:bg-background-secondary-dark'
            )}
            style={{
              borderColor: border,
              borderWidth: '2px',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex flex-row items-start justify-between gap-[2px]">
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <div className="flex flex-row item-center gap-4 mb-1">
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
              <div
                className={classNames(
                  'dark:text-text-placeholder-dark flex flex-row gap-[10px] items-center justify-center',
                  'hover:dark:text-text-primary-dark'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <GitFork size={16} /> {forkedCount}
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'absolute w-full h-full p-4 rounded-lg dark:bg-background-primary-dark flex items-center justify-center',
              'dark:text-text-primary-dark'
            )}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: border,
              borderWidth: '2px',
            }}
          >
            <span className="text-2xl font-bold tracking-tight">clipVault</span>
          </div>
        </div>
      </div>
    </div>
  );
};
