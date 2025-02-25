'use client';

import { useAuthModal } from '@/hooks';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import { LoginForm, RegisterForm } from '../form';

export const AuthModal = () => {
  const { isAuthModalOpen, modalMode, setIsAuthModalOpen } = useAuthModal();
  return (
    <StyledDialog open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} fullWidth>
      <DialogContent>{modalMode === 'login' ? <LoginForm /> : <RegisterForm />}</DialogContent>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    margin: 16px;
    border-radius: 16px;
    position: relative;
    background-color: ${(props) => props.theme.background.primary};
    padding: 20px;
    border: 1px solid ${(props) => props.theme.border.divider};
  }
`;
