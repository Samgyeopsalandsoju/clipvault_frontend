import { Typography } from '@mui/material';
import styled from 'styled-components';

interface TagProps {
  $bgColor: string;
  $textColor: string;
}

export const Tag = styled(Typography)<TagProps>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
`;
