'use client';

import { Dialog, DialogContent } from '@mui/material';
import RegisterForm from '../forms/RegisterForm';
import { useAuthModal } from '../../hooks/auth/useAuthModal';
import LoginForm from '../forms/LoginForm';
import styled from 'styled-components';

const AuthModal = () => {
  const { isOpen, mode, setIsOpen } = useAuthModal();
  return (
    <StyledDialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
      <DialogContent>{mode === 'login' ? <LoginForm /> : <RegisterForm />}</DialogContent>
    </StyledDialog>
  );
};

export default AuthModal;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    margin: 16px;
    border-radius: 16px;
    position: relative;
    background-color: #f5f4ef;
    padding: 20px;
  }
`;
