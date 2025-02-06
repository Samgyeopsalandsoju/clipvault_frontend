'use client';
import styled from 'styled-components';
import { Stack, IconButton, Box } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { Link2, Menu } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { authModalAtom, authModeAtom } from '@/atoms/auth.atom';
import { FormType } from '@/types/auth';
import ClipVaultInfo from './ClipVaultInfo';

const HeaderComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Header>
      <HeaderTitle>
        <Link2 size={20} />
        <Link href={'/'}>
          <h1>clipVault</h1>
        </Link>
      </HeaderTitle>
      <IconSection edge="end" aria-label="menu" onClick={toggleDrawer}>
        <Menu />
      </IconSection>
      <Navigation isOpen={drawerOpen} onClose={handleClose} />
    </Header>
  );
};
export default HeaderComponent;

const Header = styled.header`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
`;

const HeaderTitle = styled(Stack)`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.text.primary};

  h1 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

const IconSection = styled(IconButton)`
  color: ${(props) => props.theme.text.primary};
`;

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavBarProps) => {
  const setMode = useSetAtom(authModeAtom);
  const setIsAuthModalOpen = useSetAtom(authModalAtom);
  const isToken = false;

  const handleOpenModal = (type: FormType) => {
    onClose();
    setIsAuthModalOpen(true);
    setMode(type);
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Container $isOpen={isOpen}>
        {!isToken && (
          <LinkWrapper>
            <LinkItem onClick={() => handleOpenModal('register')}>Sign up</LinkItem>
            <LinkItem onClick={() => handleOpenModal('login')}>Login</LinkItem>
          </LinkWrapper>
        )}
        {isToken && (
          <LinkWrapper>
            <LinkItem>
              <Link href={'/mypage'}>My page</Link>
            </LinkItem>
            <LinkItem $color={'#f44336'}>Logout</LinkItem>
          </LinkWrapper>
        )}

        <ClipVaultInfo />
      </Container>
    </>
  );
};

const Overlay = styled(Stack)<{ $isOpen: boolean }>`
  position: absolute;
  top: 57px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(49, 49, 49, 0.607);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;
  z-index: 998;
  height: 100vh;
`;
const Container = styled.nav<{ $isOpen: boolean }>`
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  padding: 25px;
  position: absolute;
  top: 57px;
  right: ${(props) => (props.$isOpen ? '0' : '-100%')};
  width: 80%;
  height: calc(100vh - 60px);
  background: ${(props) => props.theme.background.primary};
  transition: right 0.3s ease-in-out;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const LinkWrapper = styled(Stack)``;

const LinkItem = styled(Box)<{ $color?: string }>`
  color: ${(props) => props.$color || props.theme.text.primary};
  padding: 25px 16px;
  border-bottom: 1px solid ${(props) => props.theme.border.divider};
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
`;
