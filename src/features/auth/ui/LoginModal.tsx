'use client';

import { Dialog, DialogContent } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginFormValue } from '../auth.types';
import { TextField } from '@mui/material';
import { OutlineCustomButton, SolidCustomButton } from '@/shared/components/button';
import { Stack } from '@mui/material';
import { useAtom } from 'jotai';
import { LoginModalIsOpenAtom } from '../auth.atom';
import { Divider } from '@mui/material';
import { useRememberMe } from '@/shared/hooks/userRememberMe';
import RememberMe from './components/Rememberme';
import { SOCIAL_LOGIN_OPTIONS } from '@/shared/constants';

const loginValidationRules = {
  email: {
    required: '이메일은 필수입니다.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효한 이메일 형식이 아닙니다.',
    },
  },
};

const LoginModal = () => {
  const { saveUsername, getSaveUsername } = useRememberMe();
  const [isOpen, setIsOpen] = useAtom(LoginModalIsOpenAtom);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValue>({
    defaultValues: {
      email: getSaveUsername(),
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    console.log('form data', data);
    saveUsername(data.email);
  };

  return (
    <StyledDialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
      <DialogContent>
        <LoginContent>
          <LoginTitle>Login</LoginTitle>

          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <TextFieldWrapper>
              <TextField
                fullWidth
                placeholder="Email"
                size="small"
                {...register('email', {
                  pattern: loginValidationRules.email.pattern,
                })}
                onBlur={() => trigger('email')}
                error={!!errors.email}
                helperText={errors.email?.message || ' '}
              />
              <TextField fullWidth placeholder="Password" size="small" type="password" {...register('password')} />
              <RememberMe />
            </TextFieldWrapper>
            <SolidCustomButton type="submit">Login</SolidCustomButton>
          </LoginForm>
          <Divider>or</Divider>
          <OutlineCustomButton>
            <Logo src={SOCIAL_LOGIN_OPTIONS.EMAIL.logo} />
            {SOCIAL_LOGIN_OPTIONS.EMAIL.text}
          </OutlineCustomButton>
          <OutlineCustomButton>
            <Logo src={SOCIAL_LOGIN_OPTIONS.GOOGLE.logo} />
            {SOCIAL_LOGIN_OPTIONS.GOOGLE.text}
          </OutlineCustomButton>
          <OutlineCustomButton $bgColor={SOCIAL_LOGIN_OPTIONS.KAKAO.bgColor}>
            <Logo src={SOCIAL_LOGIN_OPTIONS.KAKAO.logo} />
            {SOCIAL_LOGIN_OPTIONS.KAKAO.text}
          </OutlineCustomButton>
        </LoginContent>
      </DialogContent>
    </StyledDialog>
  );
};

export default LoginModal;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 400px;
    margin: 16px;
    border-radius: 16px;
    position: relative;
    background-color: ${(props) => props.theme.background.primary};
    padding: 20px;
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: ${(props) => props.theme.text.primary};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TextFieldWrapper = styled(Stack)`
  gap: 5px;
`;

const Logo = styled.img`
  padding-right: 24px;
  height: 20px;
`;
