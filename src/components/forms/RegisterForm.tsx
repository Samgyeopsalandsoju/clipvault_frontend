import { Stack, TextField } from '@mui/material';
import { OutlineCustomButton } from '@/components/styled-components/Buttons';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { Content, Form, TextFieldWrapper, Title } from './form.styles';

const RegisterForm = () => {
  const { errors, handleSubmit, onSubmit, register, trigger, validator } = useRegisterForm();
  return (
    <Content>
      <Title>Sign in</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldWrapper>
          <TextField
            fullWidth
            placeholder="Email"
            size="small"
            {...register('email', validator.email)}
            onBlur={() => trigger('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ' '}
          />
          <Stack direction={'row'} gap={'8px'}>
            <TextField
              fullWidth
              placeholder="인증 코드"
              size="small"
              {...register('verifyCode')}
              error={!!errors.verifyCode}
              helperText={errors.verifyCode?.message || ' '}
            />
            <OutlineCustomButton sx={{ height: '50%' }}>인증</OutlineCustomButton>
          </Stack>
          <TextField
            fullWidth
            placeholder="Password"
            size="small"
            type="password"
            {...register('password', validator.password)}
            error={!!errors.password}
            helperText={errors.password?.message || ' '}
          />
          <TextField
            fullWidth
            placeholder="Password"
            size="small"
            type="password"
            {...register('confirmPassword', validator.confirmPassword)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || ' '}
          />
        </TextFieldWrapper>
        <OutlineCustomButton type="submit">Sign in</OutlineCustomButton>
      </Form>
    </Content>
  );
};

export default RegisterForm;
