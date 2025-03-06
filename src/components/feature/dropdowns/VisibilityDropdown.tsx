'use client';

import { VisibilityType } from '@/types/clip';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import classNames from 'classnames';

const visibilities = [
  { name: 'Public', code: 'public' },
  { name: 'Private', code: 'private' },
];

interface DropdownProps {
  onSelect: (category: VisibilityType) => void;
  visible?: VisibilityType | undefined;
}

export const VisibilityDropdown = ({ onSelect, visible }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const displayName = visibilities.find((item) => item.code === visible)?.name || '';
  const [value, setValue] = useState<string>(displayName);

  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          className={classNames(
            'w-full px-4 py-3 rounded-[0.5rem] border-solid border-[1px] focus:outline-none focus:dark:border-border-focus-dark',
            'dark:placeholder-text-placeholder-dark dark:border-border-secondary-dark dark:bg-background-secondary-dark',
            'dark:text-text-primary-dark cursor-pointer h-[50px]'
          )}
          type="text"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="Visibility"
          value={value}
          readOnly
        />
        <button
          type="button"
          className={classNames(
            'absolute right-2 top-[50%] p-1 flex items-center justify-center',
            'text-[#666] translate-y-[-50%] pointer-events-none'
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      {isOpen && (
        <div
          className={classNames(
            'w-full absolute top-[100%] max-h-[200px] overflow-auto z-[10] rounded-lg shadow-md',
            'dark:bg-background-primary-dark border dark:border-border-focus-dark'
          )}
        >
          {visibilities.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'flex px-4 py-2 cursor-pointer items-center transition-colors duration-200',
                  'border-b last:border-none dark:border-border-focus-dark select-none',
                  'dark:hover:bg-background-secondary-dark dark:text-text-primary-dark'
                )}
                onClick={() => {
                  setValue(item.name);
                  setIsOpen(false);
                  onSelect(item.code as VisibilityType);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
