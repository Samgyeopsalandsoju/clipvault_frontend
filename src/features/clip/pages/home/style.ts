'use client';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Stack)`
  width: 100%;
  flex: 1;
  padding: 12px;
  background-color: ${(props) => props.theme.background.tertiary};
`;

export const Wrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const Title = styled(Typography)`
  color: ${(props) => props.theme.text.primary};
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  flex: 1;
  text-align: center;
`;

export const ToggleButton = styled(Stack)`
  position: absolute;
  right: 0;
`;
