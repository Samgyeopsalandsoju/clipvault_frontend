'use client';

import { TabType } from '@/types/clip';
import { Button, Stack } from '@mui/material';
import styled from 'styled-components';

interface IClipTabsProps {
  currentTab: TabType;
  onTabChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClipTabs = ({ currentTab, onTabChange }: IClipTabsProps) => {
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
  border-bottom: 1px solid ${(props) => props.theme.border.divider};
`;

const TabButton = styled(Button)<{ $isActive: boolean }>`
  width: 50%;
  background: none;
  border: none;
  padding: 0 32px 0 0;
  margin: 0;
  color: ${({ $isActive, theme }) => ($isActive ? theme.text.primary : '#9d9d9d')};
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
