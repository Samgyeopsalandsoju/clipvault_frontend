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
  color: white;
  font-size: 1.5rem;
  user-select: none;
  text-shadow: 0px 0px 10px cyan, 0px 0px 20px cyan, 0px 0px 40px cyan, 0px 0px 80px cyan;
`;

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  user-select: none;
`;
