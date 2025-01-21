'use client';

import { Button, Stack } from '@mui/material';
import styled from 'styled-components';
import { CurrentTabProps } from '../../types';

const ClipTabs = ({ currentTab, onTabChange }: CurrentTabProps) => {
  return (
    <Container>
      <Tabs>
        <TabButton value="clip" $isActive={currentTab === 'clip'} onClick={onTabChange}>
          Clip
        </TabButton>
        <TabButton value="fork" $isActive={currentTab === 'fork'} onClick={onTabChange}>
          Fork
        </TabButton>
      </Tabs>
    </Container>
  );
};

export default ClipTabs;

const Container = styled(Stack)`
  width: 100%;
`;

const Tabs = styled(Stack)`
  flex-direction: row;
  padding: 16px;
  background-color: ${(props) => props.theme.background.primary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TabButton = styled(Button)<{ $isActive: boolean }>`
  width: 50%;
  background: none;
  border: none;
  padding: 0 32px 0 0;
  margin: 0;
  color: ${({ $isActive }) => ($isActive ? '#000' : '#8e8e8e')};
  cursor: pointer;
  font-size: 20px;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
  &.MuiButton-root {
    min-width: auto;
    text-transform: none;
    letter-spacing: normal;
  }
  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    border: none;
  }
  & .MuiTouchRipple-root {
    display: none;
  }
`;
