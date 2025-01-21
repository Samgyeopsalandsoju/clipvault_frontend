'use client';
import styled from 'styled-components';
import { FaPaperclip } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Navigation from './components/Navigation';
import { Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Container>
      <LogoContainer>
        <Link href={'/clip'}>
          <FaPaperclip />
        </Link>
      </LogoContainer>
      <Link href={'/'}>
        <Title>clipVault</Title>
      </Link>
      <IconButton size="large" edge="end" aria-label="menu" onClick={toggleDrawer} sx={{ color: '#000' }}>
        <IoMenu />
      </IconButton>
      <Navigation isOpen={drawerOpen} onClose={handleClose} />
    </Container>
  );
};
export default Header;

const Container = styled.header`
  position: sticky;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const LogoContainer = styled(Stack)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text.primary};
  cursor: pointer;
`;

const Title = styled(Typography)`
  cursor: pointer;
  color: ${(props) => props.theme.text.primary};
  font-weight: 800;
  font-size: 32px;
  letter-spacing: -3px;
  -webkit-user-select: none;
  user-select: none;
`;
