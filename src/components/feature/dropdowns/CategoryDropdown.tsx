'use client';
import { Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { ICategoryRequest } from '@/types';
import { CloseButton, Container, DropdownItem, DropdownList, Input, InputWrapper } from './dropdown.styles';
import { generateModernTagColors } from '@/utils';

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
  }, [searchTerm, onCreator]);

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
  }, [searchTerm, onCreator]);

  // 기존 카테고리에 등록
  const handleSelectCategory = useCallback((category: ICategoryRequest) => {
    onSelect(category);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    return categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, categories]);

  // searchTerm 이 비어있지 않고 filterCategories가 비어잇는 경우
  const showCreateCategory = searchTerm.trim() !== '' && filteredCategories.length === 0;

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
        />
        {!isOpen && showCreateCategory && (
          <ChangeColorButton onClick={handleChangeColor}>Change color</ChangeColorButton>
        )}

        {searchTerm && (
          <CloseButton onClick={handleClearSearchTerm}>
            <IoClose />
          </CloseButton>
        )}
      </InputWrapper>
      {isOpen && (
        <DropdownList>
          {filteredCategories.map((category, index) => {
            const { background, text } = generateModernTagColors(Number(category.color));
            return (
              <DropdownItem
                $textColor={text}
                $bgColor={background}
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
          {isOpen && showCreateCategory && <CreateCategory onClick={handleCreateCategory}>+ category </CreateCategory>}
        </DropdownList>
      )}
    </Container>
  );
};

const CreateCategory = styled(Stack)`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 2px solid #ddd;
  transition: all 0.2s ease;
  background-color: ${(props) => props.theme.border.divider};
  text-align: center;
`;

const ChangeColorButton = styled(Stack)`
  border: 1px solid ${(props) => props.theme.border.secondary};
  background-color: ${(props) => props.theme.background.secondary};
  position: absolute;
  right: 40px;
  top: 50%;
  width: 100px;
  padding: 5px;
  border-radius: 4px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => props.theme.text.primary};
  text-align: center;
  font-weight: 700;
  user-select: none;
`;
