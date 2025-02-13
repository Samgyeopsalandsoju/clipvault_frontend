'use client';

import { Stack } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Stack)`
  position: relative;
  width: 100%;
`;

export const InputWrapper = styled(Stack)`
  position: relative;
`;

export const Input = styled.input<{ $bgColor?: string; $textColor?: string }>`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
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
export const DropdownList = styled(Stack)`
  width: 100%;
  position: absolute;
  top: 100%;
  background: white;
  max-height: 200px;
  overflow: auto;
  z-index: 1000;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2px;
  background-color: ${(props) => props.theme.background.primary};
`;

export const DropdownItem = styled(Stack)<{ $bgColor?: string; $textColor?: string }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => props.$bgColor || props.theme.background.secondary};
  color: ${(props) => props.$textColor || props.theme.text.primary};
  margin: 2px 0;
  transition: all 0.2s ease;
  font-weight: 600;
`;

export const CloseButton = styled.button`
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
