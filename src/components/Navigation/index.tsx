'use client';

import { authModalAtom, authModeAtom } from '@/atoms/auth.atom';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';
import Footer from '../Footer';
import { FormType } from '@/types/auth';

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
            <LinkItem>My page</LinkItem>
            <LinkItem $color={'#f44336'}>Logout</LinkItem>
          </LinkWrapper>
        )}

        <Footer />
      </Container>
    </>
  );
};

export default Navigation;

const Overlay = styled(Stack)<{ $isOpen: boolean }>`
  position: absolute;
  top: 60px;
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
  top: 60px;
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
