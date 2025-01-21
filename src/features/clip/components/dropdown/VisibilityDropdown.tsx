import { Stack } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { VisibilityType } from '../../types';
import { MdArrowDropDown } from 'react-icons/md';

const visibilities = [
  { name: '공개', code: 'public' },
  { name: '비공개', code: 'private' },
];

interface DropdownProps {
  onSelect: (category: VisibilityType) => void;
}

const VisibilityDropdown = ({ onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <Container>
      <InputWrapper>
        <Input
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="공개 범위 설정"
          value={value}
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

const Container = styled(Stack)`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const InputWrapper = styled(Stack)`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid #ddd;
  background-color: #ddd;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  &:focus {
    border-color: #007aff;
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
  transform: translateY(-50%);

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

const DropdownItem = styled(Stack)`
  padding: 4px 8px;
  cursor: pointer;
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 2px solid #aa9f84;
  background-color: #d7c9a7;
  font-size: 13px;
  font-weight: 600;
`;
