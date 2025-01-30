'use client';

import { Button, Stack } from '@mui/material';
import styled from 'styled-components';

export const ScrollContainer = styled(Stack)`
  flex: 1;
  position: relative;
  overflow: auto;
  /* 부모의 높이를 유지 */
  min-height: 0;
  /** hide scroll */
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${(props) => props.theme.background.primary};
  padding-bottom: 100px;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled(Stack)`
  background-color: ${(props) => props.theme.background.tertiary};
  padding: 1.5rem;
  width: 100%;
`;

export const TitleSection = styled(Stack)`
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
`;

export const Divider = styled(Stack)`
  width: 2.5rem;
  height: 0.25rem;
  background-color: #3f3f46;
  border-radius: 9999px;
  margin: 0 auto 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.text.primary};
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
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 24rem;
  margin: 0 auto;
  width: 100%;
`;

export const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.text.primary};

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border.focus};
  }
`;

export const TextArea = styled.textarea<{ $error: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.text.primary};
  min-height: 100px;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border.focus};
  }
`;
