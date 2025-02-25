'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import classNames from 'classnames';
import { ICategoryResponse } from '@/types';
import { useOverflowDetection } from '@/hooks';
import { generateModernTagColors } from '@/utils';
import { CategoryManageTag } from './CategoryManageTag';

interface ICategoriesTabsProps {
  categories: ICategoryResponse[];
  onSelect: (id: string) => void;
}

export const CategoriesTags = ({ categories, onSelect }: ICategoriesTabsProps) => {
  const { containerRef, contentRef, isExpanded, setIsExpanded } = useOverflowDetection({
    data: categories,
  });
  return (
    <div className="py-4 px-4 relative  border-solid border-b-[1px] dark:border-border-primary-dark" ref={containerRef}>
      <div
        className={classNames('gap-2 flex', {
          'flex-wrap h-auto': isExpanded,
          'whitespace-nowrap overflow-hidden': !isExpanded,
        })}
        ref={contentRef}
      >
        <div
          className={classNames(
            'px-3 py-1 text-[0.875rem] rounded-[0.5rem]',
            'cursor-pointer select-none whitespace-nowrap',
            'dark:bg-background-textfield-dark dark:text-background-primary-dark'
          )}
          onClick={() => {
            onSelect('');
            setIsExpanded(false);
          }}
        >
          All
        </div>
        {categories.map((category, index) => {
          const colors = generateModernTagColors(Number(category.color));
          return (
            <div
              className={classNames(
                'px-3 py-1 text-[0.875rem] rounded-[0.5rem]',
                'cursor-pointer select-none whitespace-nowrap',
                'dark:bg-background-textfield-dark dark:text-background-primary-dark'
              )}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
              }}
              key={index}
              onClick={() => {
                onSelect(category.id);
                setIsExpanded(false);
              }}
            >
              {category.name}
            </div>
          );
        })}
        <CategoryManageTag />
        <div
          className={classNames(
            'absolute right-[1rem] bottom-[8px] flex items-center translate-y-[-31%] rounded-lg',
            'p-[2px] backdrop-blur-md transition-all duration-200 ease-in-out dark:bg-background-secondary-dark'
          )}
        >
          <button
            className={classNames(
              'min-w-[24px] w-[24px] h-[24px] p-0 flex items-center justify-center',
              'dark:text-text-placeholder-dark hover:dark:text-white'
            )}
            onClick={() => {
              setIsExpanded((prev) => !prev);
            }}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
