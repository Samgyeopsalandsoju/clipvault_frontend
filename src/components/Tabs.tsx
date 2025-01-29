'use client';

import { MENU } from '@/constants/common.constants';
import { Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const ClipTabs = () => {
  const params = usePathname();

  const isActive = (path: string) => {
    const currentPath = params.split('/')[1];
    const menuPath = path.split('/')[1];
    return currentPath === menuPath;
  };

  isActive(params);
  return (
    <Nav>
      <TabContainer>
        {MENU.map((item, index) => {
          return (
            <Tab value={item.name} $isActive={isActive(item.path)} key={index}>
              <Link href={item.path}>{item.name}</Link>
            </Tab>
          );
        })}
      </TabContainer>
    </Nav>
  );
};

export default ClipTabs;

const Nav = styled.nav`
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
`;

const TabContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
`;

const Tab = styled.button<{ $isActive?: boolean }>`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.$isActive ? '#f4f4f5' : '#a1a1aa')};
  border-bottom: 2px solid ${(props) => (props.$isActive ? '#ffffff' : 'transparent')};
`;
