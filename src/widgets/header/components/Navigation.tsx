import { LoginModalIsOpenAtom } from '@/features/auth/auth.atom';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { useSetAtom } from 'jotai';
import Link from 'next/link';
import styled from 'styled-components';

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavBarProps) => {
  const setIsLoginModalOpen = useSetAtom(LoginModalIsOpenAtom);
  const handleOpenLoginModal = () => {
    onClose();
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Container $isOpen={isOpen}>
        <LinkWrapper>
          <LinkItem>
            <Link href={'/'}>Sign up</Link>
          </LinkItem>
          <LinkItem onClick={handleOpenLoginModal}>Login</LinkItem>
        </LinkWrapper>
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

const LinkWrapper = styled(Stack)`
  padding: 25px;
`;

const LinkItem = styled(Box)`
  padding: 25px 16px;
  border-bottom: 1px solid #565656;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
`;
