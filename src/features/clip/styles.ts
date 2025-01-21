import { Button, Stack, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const ScrollContainer = styled(Stack)`
  overflow: auto;
  /** hide scroll */
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${(props) => props.theme.background.secondary};
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled(Stack)`
  padding: 0px 32px 32px 32px;
  align-items: center;
  width: 100%;
  pad: 20px;
`;

export const Wrapper = styled(Stack)`
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const DragHandle = styled(Stack)`
  width: 40px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 12px auto;
  cursor: grab;
`;

export const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -2px;
  color: ${(props) => props.theme.text.primary};
`;

export const StyledInput = styled.input<{ $error?: boolean; $height?: string }>`
  width: 300px;
  padding: 8px 12px;
  border: 2px solid ${(props) => (props.$error ? '#f44336' : props.theme.border.divider)};
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  background-color: ${(props) => props.theme.background.textfield};
  transition: all 0.2s ease-in-out;
  height: ${(props) => props.$height || ''};
  &::placeholder {
    color: rgb(113, 113, 113);
  }
`;

export const Textarea = styled.textarea<{ $error?: boolean }>`
  width: 300px;
  border: 2px solid ${(props) => (props.$error ? '#f44336' : props.theme.border.divider)};
  background-color: ${(props) => props.theme.background.textfield};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: none;
  min-height: 100px;
`;

export const BorderLessButton = styled(Button)<{ $color?: string }>`
  color: ${(props) => (props.$color ? props.$color : props.theme.text.primary)};
  font-size: 15px;
  text-transform: none;
  box-shadow: none;
  font-weight: 600;
  &:hover {
    background-color: inherit;
  }

  &:active {
    background-color: inherit;
  }
`;

export const DragHandleSection = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`;
