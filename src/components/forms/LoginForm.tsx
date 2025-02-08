import { SOCIAL_LOGIN_OPTIONS } from '@/constants/auth.constants';
import { Stack } from '@mui/material';
import { OutlineCustomButton } from '@/components/styled-components/Buttons';
import RememberMe from './RememberMe';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Content, CustomTextField, Divider, Form, Logo, TextFieldWrapper, Title } from './form.styles';

const loginValidationRules = {
  email: {
    required: 'Email is required.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format.',
    },
  },
};

const LoginForm = () => {
  const { handleClick, handleSubmit, onSubmit, register, trigger, errors } = useLoginForm();
  return (
    <>
      <Content>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextFieldWrapper gap={'10px !important'}>
              <CustomTextField
                size="small"
                placeholder="Email"
                {...register('email', {
                  pattern: loginValidationRules.email.pattern,
                })}
                onBlur={() => trigger('email')}
              />
              <CustomTextField size="small" placeholder="Password" type="password" {...register('password')} />
            </TextFieldWrapper>
            <RememberMe />
          </Stack>
          <OutlineCustomButton type="submit">Login</OutlineCustomButton>
        </Form>
      </Content>
      <Stack gap={'12px'} marginTop={'10px'}>
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
