'use client';

import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

export const ClipStatsContainer = styled(Stack)`
  text-align: center;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  color: ${(props) => props.theme.text.primary};
`;

export const StatNumber = styled(Typography)`
  font-weight: 600;
  color: ${(props) => props.theme.text.secondary};
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  user-select: none;
`;

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  user-select: none;
`;
