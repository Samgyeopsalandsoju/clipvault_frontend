'use client';

import { VisibilityType } from '@/types/clip';
import { useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styled from 'styled-components';
import { Container, DropdownItem, DropdownList, Input, InputWrapper } from './dropdown.styles';
import { EyeClosed, Eye } from 'lucide-react';

const visibilities = [
  { name: 'Public', code: 'public', icon: <Eye /> },
  { name: 'Private', code: 'private', icon: <EyeClosed /> },
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
                {item.icon} {item.name}
              </DropdownItem>
            );
          })}
        </DropdownList>
      )}
    </Container>
  );
};

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #666;

  svg {
    width: 16px;
    height: 16px;
  }
`;

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
