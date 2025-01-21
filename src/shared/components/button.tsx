import { Button } from '@mui/material';
import styled from 'styled-components';

// 아웃 라인 커스텀 버튼
export const OutlineCustomButton = styled(Button)<{ $bgColor?: string }>`
  font-size: 15px;
  font-family: 'Wanted Sans', sans-serif;
  font-weight: 500;
  color: #000;
  text-transform: none;
  box-shadow: none;
  border-radius: 5px;
  border: 1px solid #2a2a2a;
  color: ${(props) => (props.$bgColor ? '#000' : props.theme.text.primary)};
  border: ${(props) => (props.$bgColor ? 'none' : '1px solid #2a2a2a')};
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : props.theme.background.primary)};
  &:hover {
    background-color: ${(props) => (props.$bgColor ? props.$bgColor : 'rgba(42, 42, 42, 0.05)')};
  }
`;

// 솔리드 커스텀 버튼
export const SolidCustomButton = styled(Button)<{ $color?: string }>`
  background-color: ${(props) => (props.$color ? props.$color : props.theme.text.primary)};
  font-size: 15px;
  font-family: 'Wanted Sans', sans-serif;
  color: ${(props) => props.theme.background.primary};
  text-transform: none;
  box-shadow: none;
  font-weight: 400;

  &:hover {
    background-color: ${(props) => props.theme.text.primary};
  }
`;

export const SolidSmallCustomButton = styled(Button)`
  background-color: ${(props) => props.theme.background.primary};
  font-size: 15px;
  font-family: 'Wanted Sans', sans-serif;
  color: ${(props) => props.theme.text.primary};
  text-transform: none;
  box-shadow: none;
  font-weight: 400;

  &:hover {
    background-color: ${(props) => props.theme.background.primary};
  }
`;
