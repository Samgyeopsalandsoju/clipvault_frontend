'use client';
import { Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { ICategoryResponse } from '@/types/clip';
import { Container, DropdownItem, DropdownList, InputWrapper } from '../shared/dropdown.styles';
import { generateModernTagColors, generateSoftColor, generateUniqueId } from '@/utils/utils';

interface DropdownProps {
  onSelect: (category: ICategoryResponse) => void;
  onCreator: (category: ICategoryResponse) => void;
  categories: ICategoryResponse[];
}

const CategoryDropdown = ({ onSelect, onCreator, categories }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  // 신규 카테고리에 등록
  const handleCreateCategory = useCallback(() => {
    const { colorHue, background, text } = generateModernTagColors();
    const category: ICategoryResponse = {
      id: generateUniqueId(),
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
    const category: ICategoryResponse = {
      id: generateUniqueId(),
      color: String(colorHue),
      name: searchTerm,
    };
    onCreator(category);
  }, [searchTerm, onCreator]);

  // 기존 카테고리에 등록
  const handleSelectCategory = useCallback((category: ICategoryResponse) => {
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
          placeholder="카테고리"
        />
        {!isOpen && showCreateCategory && <ChangeColorButton onClick={handleChangeColor}>색 변경</ChangeColorButton>}

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

export default CategoryDropdown;

const Input = styled.input<{ $bgColor?: string; $textColor?: string }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : props.theme.background.secondary)};
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-radius: 0.5rem;
  color: ${(props) => (props.$textColor ? props.$textColor : props.theme.text.primary)};

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border.focus};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  padding: 4px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    color: #333;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const CreateCategory = styled(Stack)`
  padding: 4px 8px;
  cursor: pointer;
  border: 2px solid #ddd;
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  background-color: ${(props) => props.theme.border.divider};
  text-align: center;
`;

const ChangeColorButton = styled(Stack)`
  border: 2px solid #20363646;
  background-color: #3f5a5a;
  position: absolute;
  right: 40px;
  top: 50%;
  width: 50px;
  border-radius: 4px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  user-select: none;
`;
