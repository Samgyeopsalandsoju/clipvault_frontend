import { UseFormWatch } from 'react-hook-form';
import { RegisterFormValue } from '../types';

export const useRegisterValidation = (getValues: UseFormWatch<RegisterFormValue>) => ({
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효한 이메일 형식이 아닙니다.',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value: /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=\S+$).{8,}$/,
      message: '영문자(대,소문자), 숫자, 특수문자를 포함하여 최소 8자 이상 작성 해야 합니다.',
    },
  },
  confirmPassword: {
    validate: (value: string) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
  },
});
