'use client';

import { Stack } from '@mui/material';
import { Dialog } from '@mui/material';
import styled from 'styled-components';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    margin: 16px;
    border-radius: 16px;
    position: relative;
    background-color: #f5f4ef;
    padding: 20px;
  }
`;

export const Content = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: #1f1e1d;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TextFieldWrapper = styled(Stack)`
  gap: 5px;
`;

export const Logo = styled.img`
  padding-right: 24px;
  height: 20px;
`;
