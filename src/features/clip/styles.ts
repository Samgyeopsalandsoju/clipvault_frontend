import { Stack } from '@mui/material';
import styled from 'styled-components';

export const ScrollContainer = styled(Stack)`
  overflow: auto;
  /** hide scroll */
  -ms-overflow-style: none;
  scrollbar-width: none;
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;
