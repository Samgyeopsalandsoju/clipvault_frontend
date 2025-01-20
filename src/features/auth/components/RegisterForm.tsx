import { Stack, TextField } from '@mui/material';
import { Content, Form, TextFieldWrapper, Title } from '../styles';
import { SolidCustomButton } from '@/shared/components/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormValue } from '../types';
import { useRegisterValidation } from '../hooks/useRegisterValidation';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    mode: 'onChange',
  });
  const validator = useRegisterValidation(watch);

  const onSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    console.log('form data', data);
  };
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
            <SolidCustomButton sx={{ height: '50%' }}>인증</SolidCustomButton>
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
        <SolidCustomButton type="submit">Login</SolidCustomButton>
      </Form>
    </Content>
  );
};

export default RegisterForm;
