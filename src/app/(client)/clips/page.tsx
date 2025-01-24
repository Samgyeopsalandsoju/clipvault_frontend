'use client';

import { TabType } from '@/types/clip';
import { Stack } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import ClipTabs from './components/ClipTabs';
import ClipContent from './components/ClipContent';
const Page = () => {
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
export default Page;

const PageContainer = styled(Stack)`
  height: 100%;
`;
