'use client';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

export const Card = styled(Stack)<{ $isPublic?: boolean; $border?: string }>`
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.background.secondaryWithOpacity};
  backdrop-filter: blur(16px);
  border: 1px solid ${(props) => props.theme.background.secondaryWithOpacity};
  transition: all 0.2s;

  ${(props) => {
    if (props.$isPublic) {
      return `
        box-shadow: 0 0 0 2px ${props.$border};
      `;
    }
  }}

  &:hover {
    background-color: ${(props) => props.theme.background.secondary};

    button {
      opacity: 1;
    }
  }

  @media screen and (max-width: 900px) {
    button {
      opacity: 0.3;
    }
  }
`;

export const Content = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2px;
`;

export const ClipInfo = styled(Stack)`
  flex: 1;
  min-width: 0;
  gap: 8px;
`;

export const TitleRow = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;
`;

export const ClipTitle = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.text.primary};
`;

export const ClipUrl = styled(Typography)`
  font-size: 0.75rem;
  color: #a1a1aa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
