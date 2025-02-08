import { Stack, TextField } from '@mui/material';
import { OutlineCustomButton } from '@/components/styled-components/Buttons';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { Content, CustomTextField, Form, TextFieldWrapper, Title } from './form.styles';

const RegisterForm = () => {
  const { errors, handleSubmit, onSubmit, register, trigger, validator } = useRegisterForm();
  return (
    <Content>
      <Title>Sign in</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldWrapper>
          <CustomTextField
            size="small"
            placeholder="Email"
            {...register('email', validator.email)}
            onBlur={() => trigger('email')}
            error={!!errors.email}
            helperText={errors.email?.message || ' '}
          />
          <Stack direction={'row'} gap={'8px'}>
            <CustomTextField
              size="small"
              placeholder="Verify code"
              {...register('verifyCode')}
              error={!!errors.verifyCode}
              helperText={errors.verifyCode?.message || ' '}
            />
            <OutlineCustomButton sx={{ height: '50%' }}>verify</OutlineCustomButton>
          </Stack>
          <CustomTextField
            size="small"
            placeholder="Password"
            type="password"
            {...register('password', validator.password)}
            error={!!errors.password}
            helperText={errors.password?.message || ' '}
          />
          <CustomTextField
            placeholder="Confirm Password"
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
