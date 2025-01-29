'use client';

import { Button } from '@mui/material';
import styled from 'styled-components';

// 아웃 라인 커스텀 버튼
export const OutlineCustomButton = styled(Button)<{ $bgColor?: string }>`
  font-size: 15px;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  border-radius: 5px;
  color: ${(props) => (props.$bgColor ? '#000' : props.theme.text.primary)};
  border: ${(props) => (props.$bgColor ? 'none' : '1px solid #2a2a2a')};
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : props.theme.background.primary)};
  &:hover {
    background-color: ${(props) => (props.$bgColor ? props.$bgColor : props.theme.background.primary)};
  }
`;

// 솔리드 커스텀 버튼
export const SolidCustomButton = styled(Button)<{ $color?: string }>`
  font-size: 15px;
  font-weight: 500;
  text-transform: none;
  box-shadow: none;
  border-radius: 5px;
  color: ${(props) => props.theme.background.primary};
  background-color: ${(props) => (props.$color ? props.$color : props.theme.text.primary)};

  &:hover {
    background-color: ${(props) => props.theme.text.primary};
  }
`;

// 솔리드 커스텀 버튼인데 기존과 색이 반대
export const SolidSmallCustomButton = styled(Button)`
  background-color: ${(props) => props.theme.background.primary};
  font-size: 15px;
  color: ${(props) => props.theme.text.primary};
  text-transform: none;
  box-shadow: none;
  font-weight: 400;

  &:hover {
    background-color: ${(props) => props.theme.background.primary};
  }
`;
