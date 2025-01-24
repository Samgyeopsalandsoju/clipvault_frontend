import { SOCIAL_LOGIN_OPTIONS } from '@/constants/auth.constants';
import { Divider, Stack, TextField } from '@mui/material';
import { OutlineCustomButton } from '@/components/button';
import RememberMe from '../RememberMe';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Content, Form, Logo, TextFieldWrapper, Title } from '../styles';

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
  const { errors, handleClick, handleSubmit, onSubmit, register, trigger } = useLoginForm();
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
          <OutlineCustomButton type="submit">Login</OutlineCustomButton>
        </Form>
      </Content>
      <Stack gap={'16px'} marginTop={'16px'}>
        <Divider color={'#fff'}>or</Divider>
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
