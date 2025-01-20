import { TextField } from '@mui/material';
import { Content, Form, Logo, TextFieldWrapper, Title } from '../styles';
import { OutlineCustomButton, SolidCustomButton } from '@/shared/components/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValue } from '../types';
import { useRememberMe } from '@/shared/hooks/userRememberMe';
import RememberMe from './RememberMe';
import { Divider } from '@mui/material';
import { SOCIAL_LOGIN_OPTIONS } from '@/shared/constants';
import { Stack } from '@mui/material';
import { useSetAtom } from 'jotai';
import { ChangeFormAtom } from '../atom';

const loginValidationRules = {
  email: {
    required: '이메일은 필수입니다.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효한 이메일 형식이 아닙니다.',
    },
  },
};

const LoginForm = () => {
  const { saveUsername, getSaveUsername } = useRememberMe();
  const setPage = useSetAtom(ChangeFormAtom);
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

  const handleClick = () => {
    setPage('register');
  };

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    console.log('form data', data);
    saveUsername(data.email);
  };
  return (
    <>
      <Content>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
        </Form>
      </Content>
      <Stack gap={'16px'} marginTop={'16px'}>
        <Divider>or</Divider>
        <OutlineCustomButton onClick={handleClick}>
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
      </Stack>
    </>
  );
};

export default LoginForm;
