'use client';

import styled from 'styled-components';
import ClipTabs from '../components/tabs/ClipTabs';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { TabType } from '../types';
import ClipContent from '../components/contents/ClipContent';

const ClipListPage = () => {
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
export default ClipListPage;

const PageContainer = styled(Stack)`
  height: 100%;
`;
