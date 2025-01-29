'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';
import { VisibilityType } from '@/types/clip';
import { Container, DropdownItem, DropdownList, Input, InputWrapper } from './dropdown.styles';

const visibilities = [
  { name: 'Public', code: 'public', color: '' },
  { name: 'Private', code: 'private', color: '' },
];

interface DropdownProps {
  onSelect: (category: VisibilityType) => void;
  visible?: VisibilityType | undefined;
}

const VisibilityDropdown = ({ onSelect, visible }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(visible);
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

  return (
    <Container ref={dropdownRef}>
      <InputWrapper>
        <Input
          type="text"
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="Visibility"
          value={value}
          readOnly
        />
        <IconSection>
          <MdArrowDropDown />
        </IconSection>
      </InputWrapper>
      {isOpen && (
        <DropdownList>
          {visibilities.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={() => {
                  setValue(item.name);
                  setIsOpen(false);
                  onSelect(item.code as VisibilityType);
                }}
              >
                {item.name}
              </DropdownItem>
            );
          })}
        </DropdownList>
      )}
    </Container>
  );
};

export default VisibilityDropdown;

const IconSection = styled.button`
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
  pointer-events: none;
  transform: translateY(-50%);

  svg {
    width: 16px;
    height: 16px;
  }
`;
