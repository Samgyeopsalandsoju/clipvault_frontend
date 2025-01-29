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

export const Input = styled.input<{ $color?: string }>`
  width: 100%;
  border: 2px solid #ddd;
  background-color: ${(props) => props.$color || props.theme.background.textfield};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #007aff;
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
  padding: 4px 8px;
  cursor: pointer;
  background-color: ${(props) => props.$bgColor || props.theme.background.secondary};
  color: ${(props) => props.$textColor || props.theme.text.primary};
  margin: 2px 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 600;
`;
