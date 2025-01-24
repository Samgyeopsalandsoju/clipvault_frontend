'use client';

import { DialogContent } from '@mui/material';
import { StyledDialog } from '../forms/styles';
import RegisterForm from '../forms/RegisterForm';
import { useAuthModal } from '../../hooks/auth/useAuthModal';
import LoginForm from '../forms/LoginForm';

const AuthModal = () => {
  const { isOpen, mode, setIsOpen } = useAuthModal();
  return (
    <StyledDialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
      <DialogContent>{mode === 'login' ? <LoginForm /> : <RegisterForm />}</DialogContent>
    </StyledDialog>
  );
};

export default AuthModal;
