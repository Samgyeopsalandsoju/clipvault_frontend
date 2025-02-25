'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { ICategoryRequest } from '@/types';
import { generateModernTagColors } from '@/utils';
import classNames from 'classnames';

interface DropdownProps {
  onSelect: (category: ICategoryRequest) => void;
  onCreator: (category: ICategoryRequest) => void;
  categories: ICategoryRequest[];
}

export const CategoryDropdown = ({ onSelect, onCreator, categories }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [color, setColor] = useState<{ background: string; text: string }>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지를 위한 useEffect
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      if (searchTerm) {
        handleCreateCategory();
      }
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 카테고리 인풋 박스 클린
  const handleClearSearchTerm = () => {
    setColor({ background: '', text: '' });
    setSearchTerm('');
    setIsOpen(true);
  };

  // 신규 카테고리에 등록
  const handleCreateCategory = useCallback(() => {
    const { colorHue, background, text } = generateModernTagColors();
    const category: ICategoryRequest = {
      id: '',
      color: String(colorHue),
      name: searchTerm,
    };
    setIsOpen(false);
    setColor({ background: background, text: text });
    onCreator(category);
  }, [searchTerm]);

  // 신규 카테고리 색 변경
  const handleChangeColor = useCallback(() => {
    const { colorHue, background, text } = generateModernTagColors();
    setColor({ background: background, text: text });
    const category: ICategoryRequest = {
      id: '',
      color: String(colorHue),
      name: searchTerm,
    };
    onCreator(category);
  }, [searchTerm]);

  // 기존 카테고리에 등록
  const handleSelectCategory = useCallback((category: ICategoryRequest) => {
    onSelect(category);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    return categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, categories]);

  // searchTerm 이 비어있지 않고 filterCategories가 비어잇는 경우
  const showCreateCategory =
    searchTerm.trim() !== '' && !filteredCategories.some((item) => item.name === searchTerm.trim());

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
        />
        {!isOpen && showCreateCategory && (
          <div
            className={classNames(
              'absolute right-[40px] top-[50%] translate-y-[-50%]',
              'cursor-pointer select-none',
              'transform transition-transform duration-300 active:rotate-180'
            )}
            style={{
              color: color?.text,
            }}
            onClick={handleChangeColor}
          >
            <RefreshCw size={20} />
          </div>
        )}

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
          {filteredCategories.map((category, index) => {
            const { background, text } = generateModernTagColors(Number(category.color));
            return (
              <div
                className={classNames(
                  'flex px-4 py-2 cursor-pointer items-center transition-colors duration-200',
                  'border-b last:border-none dark:border-border-focus-dark select-none',
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
          {isOpen && showCreateCategory && (
            <div
              className={classNames(
                'py-2 px-4 rounded-lg cursor-pointer text-center',
                'border-b last:border-none dark:border-border-focus-dark',
                'border-solid border-[1px] dark:border-border-secondary-dark',
                'dark:text-text-primary-dark dark:bg-background-secondary-dark'
              )}
              onClick={handleCreateCategory}
            >
              + category
            </div>
          )}
        </div>
      )}
    </div>
  );
};
