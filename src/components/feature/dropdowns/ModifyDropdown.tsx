'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { generateModernTagColors } from '@/utils';
import { ICategoryRequest } from '@/types';
import classNames from 'classnames';
import { X } from 'lucide-react';

interface DropdownProps {
  onSelect: (category: ICategoryRequest) => void;
  categories: ICategoryRequest[];
  category?: ICategoryRequest | undefined;
}

export const ModifyDropdown = ({ onSelect, categories, category }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(category?.name);
  const [color, setColor] = useState<{ background: string; text: string }>({ background: '', text: '' });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지를 위한 useEffect
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { background, text } = generateModernTagColors(Number(category?.color));
    setColor({ background: background, text: text });
  }, []);

  // 카테고리 인풋 박스 클린
  const handleClearSearchTerm = () => {
    setColor({ background: '', text: '' });
    setSearchTerm('');
    setIsOpen(true);
  };

  // 기존 카테고리에 등록
  const handleSelectCategory = (category: ICategoryRequest) => {
    onSelect(category);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          className={classNames(
            'w-full px-4 py-3 rounded-[0.5rem] border-solid border-[1px] focus:outline-none focus:dark:border-border-focus-dark',
            'dark:placeholder-text-placeholder-dark dark:border-border-secondary-dark dark:bg-background-secondary-dark',
            'dark:text-text-primary-dark cursor-pointer'
          )}
          style={{
            backgroundColor: color?.background,
            color: color?.text,
          }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Category"
          readOnly
        />
        {searchTerm && (
          <button
            className={classNames(
              'absolute right-[8px] top-[50%] px-1 flex items-center justify-center',
              'cursor-pointer transform translate-y-[-50%] dark:text-text-primary-dark'
            )}
            style={{
              color: color?.text,
            }}
            onClick={handleClearSearchTerm}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {isOpen && (
        <div
          className={classNames(
            'w-full absolute top-[100%] max-h-[200px] overflow-auto z-[10] rounded-lg shadow-md',
            'dark:bg-background-primary-dark border dark:border-border-focus-dark'
          )}
        >
          {categories.map((category, index) => {
            const { background, text } = generateModernTagColors(Number(category.color));
            return (
              <div
                className={classNames(
                  'flex px-4 py-2 cursor-pointer items-center transition-colors duration-200',
                  'border-b last:border-none dark:border-border-focus-dark',
                  'dark:hover:bg-background-secondary-dark dark:text-text-primary-dark'
                )}
                style={{
                  backgroundColor: background,
                  color: text,
                }}
                key={index}
                onClick={() => {
                  setColor({ background: background, text: text });
                  handleSelectCategory(category);
                  setIsOpen(false);
                  setSearchTerm(category.name);
                }}
              >
                {category.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
