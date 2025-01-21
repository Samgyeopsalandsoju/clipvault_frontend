'use client';

import styled from 'styled-components';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { TabType } from '../model/clip.type';
import ClipTabs from '../ui/navigation/ClipTabs';
import ClipContent from '../ui/clips/ClipContent';

const ClipContainer = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('clip');
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCurrentTab(value as TabType);
  };

  return (
    <PageContainer>
      <ClipTabs currentTab={currentTab} onTabChange={handleTabClick} />
      <ClipContent currentTab={currentTab} />
    </PageContainer>
  );
};
export default ClipContainer;

const PageContainer = styled(Stack)`
  height: 100%;
`;
