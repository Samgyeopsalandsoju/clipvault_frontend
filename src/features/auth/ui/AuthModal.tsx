'use client';

import { DialogContent } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeFormAtom, ModalIsOpenAtom } from '../atom';
import { StyledDialog } from '../styles';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthModal = () => {
  const [isOpen, setIsOpen] = useAtom(ModalIsOpenAtom);
  const page = useAtomValue(ChangeFormAtom);

  return (
    <StyledDialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
      <DialogContent>{page === 'login' ? <LoginForm /> : <RegisterForm />}</DialogContent>
    </StyledDialog>
  );
};

export default AuthModal;
