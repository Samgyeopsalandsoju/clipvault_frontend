import { Typography } from '@mui/material';
import styled from 'styled-components';

interface TagProps {
  $bgColor: string;
  $textColor: string;
}

export const TabTag = styled(Typography)<TagProps>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
`;

export const CardTag = styled(Typography)<TagProps>`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 120px; // 필요한 경우 최대 너비 지정

  @media screen and (max-width: 425px) {
    max-width: 80px;
  }

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
`;
