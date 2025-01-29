'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { ICategoryResponse } from '@/types/clip';
import { CloseButton, Container, DropdownItem, DropdownList, Input, InputWrapper } from './dropdown.styles';
import { generateModernTagColors } from '@/utils/utils';

interface DropdownProps {
  onSelect: (category: ICategoryResponse) => void;
  categories: ICategoryResponse[];
  category?: ICategoryResponse | undefined;
}

const ModifyDropdown = ({ onSelect, categories, category }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(category?.name || '');
  const [color, setColor] = useState<{ background: string; text: string }>();
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

  // 카테고리 인풋 박스 클린
  const handleClearSearchTerm = () => {
    setColor({ background: '', text: '' });
    setSearchTerm('');
    setIsOpen(true);
  };

  // 기존 카테고리에 등록
  const handleSelectCategory = useCallback((category: ICategoryResponse) => {
    onSelect(category);
  }, []);

  return (
    <Container ref={dropdownRef}>
      <InputWrapper>
        <Input
          $bgColor={color?.background}
          $textColor={color?.text}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Category"
          readOnly
        />
        {searchTerm && (
          <CloseButton onClick={handleClearSearchTerm}>
            <IoClose />
          </CloseButton>
        )}
      </InputWrapper>
      {isOpen && (
        <DropdownList>
          {categories.map((category, index) => {
            const { background, text } = generateModernTagColors(Number(category.color));
            return (
              <DropdownItem
                $bgColor={background}
                $textColor={text}
                key={index}
                onClick={() => {
                  setColor({ background: background, text: text });
                  handleSelectCategory(category);
                  setIsOpen(false);
                  setSearchTerm(category.name);
                }}
              >
                {category.name}
              </DropdownItem>
            );
          })}
        </DropdownList>
      )}
    </Container>
  );
};

export default ModifyDropdown;
