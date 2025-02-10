import { RegisterFormValue } from '@/types/auth';
import { UseFormWatch } from 'react-hook-form';

export const useRegisterValidation = (getValues: UseFormWatch<RegisterFormValue>) => ({
  mail: {
    required: 'Please enter your Email',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format',
    },
  },
  password: {
    required: 'Please enter your password',
    pattern: {
      value: /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?=\S+$).{8,}$/,
      message: '8+ chars with uppercase, numbers & symbols',
    },
  },
  confirmPassword: {
    validate: (value: string) => value === getValues('password') || 'Passwords do not match',
  },
});
