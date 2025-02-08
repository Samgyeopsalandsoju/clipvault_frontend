'use client';

import { Stack, TextField } from '@mui/material';
import styled from 'styled-components';

export const Content = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: ${(props) => props.theme.text.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextFieldWrapper = styled(Stack)`
  gap: 5px;
`;

export const Logo = styled.img`
  padding-right: 24px;
  height: 20px;
`;

export const Divider = styled(Stack)`
  align-items: center;
  text-align: center;
  flex-direction: row;
  color: ${(props) => props.theme.border.divider};
  margin: 0 1rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${(props) => props.theme.border.divider};
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

export const CustomTextField = styled(TextField)`
  display: flex;
  flex: 1;
  & .MuiOutlinedInput-root {
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) => props.theme.background.secondary};
    & fieldset {
      border-color: ${(props) => props.theme.border.divider};
      border-radius: 8px;
    }
    &:hover fieldset {
      border-color: ${(props) => props.theme.border.divider};
    }
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.border.divider};
    }
  }

  & .MuiFormHelperText-root {
    margin-left: 8px;
  }
`;
