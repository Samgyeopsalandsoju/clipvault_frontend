'use client';
import { Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../types';
import { IoClose } from 'react-icons/io5';
import { generateSoftColor } from '../../utils';
const CATEGORY = [
  {
    id: '1',
    name: '먹방',
    color: '#BFC8D7',
  },
  {
    id: '2',
    name: '공부',
    color: '#E2D2D2',
  },
  {
    id: '3',
    name: '재밌는거',
    color: '#E3E2B4',
  },
  {
    id: '4',
    name: '운동',
    color: '#917B56',
  },
  {
    id: '5',
    name: '영화추천',
    color: '#D1DFE8',
  },
];

interface DropdownProps {
  onSelect: (category: Category) => void;
}

const Dropdown = ({ onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>(CATEGORY);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
  const [color, setColor] = useState<string>('#ddd');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // 카테고리 인풋 박스 클린
  const handleClearSearchTerm = () => {
    setColor('#ddd');
    setSearchTerm('');
    setIsOpen(true);
  };

  // 카테고리 생성 함수
  const handleCreateCategory = () => {
    const randomColor = generateSoftColor();
    const category: Category = {
      color: randomColor,
      name: searchTerm,
    };
    setIsOpen(false);
    setColor(randomColor);
    onSelect(category);
  };

  // 색 변경
  const handleChangeColor = () => {
    const newColor = generateSoftColor();
    setColor(newColor);
    const category: Category = {
      color: newColor,
      name: searchTerm,
    };
    onSelect(category);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
      return;
    }
    const filtered = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // searchTerm 이 비어있지 않고 filterCategories가 비어잇는 경우
  const showCreateCategory = searchTerm.trim() !== '' && filteredCategories.length === 0;

  return (
    <Container ref={dropdownRef}>
      <InputWrapper>
        <Input
          $color={color}
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
            return (
              <DropdownItem
                $color={category.color}
                key={index}
                onClick={() => {
                  setColor(category.color);
                  onSelect(category);
                  setIsOpen(false);
                  setSearchTerm(category.name);
                }}
              >
                {category.name}
              </DropdownItem>
            );
          })}
          {isOpen && showCreateCategory && (
            <CreateCategory onClick={handleCreateCategory}>add category +</CreateCategory>
          )}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled(Stack)`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const InputWrapper = styled(Stack)`
  position: relative;
`;

const Input = styled.input<{ $color: string }>`
  width: 100%;
  border: 2px solid #ddd;
  background-color: ${(props) => props.$color};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007aff;
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

const DropdownList = styled(Stack)`
  width: 100%;
  position: absolute;
  top: 100%;
  background: white;
  max-height: 200px;
  overflow: auto;
  z-index: 1000;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2px;
`;

const DropdownItem = styled(Stack)<{ $color: string }>`
  padding: 4px 8px;
  cursor: pointer;
  border: 2px solid ${(props) => props.$color};
  background-color: ${(props) => props.$color};
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 600;
`;

const CreateCategory = styled(Stack)`
  padding: 4px 8px;
  cursor: pointer;
  border: 2px solid #ddd;
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
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
