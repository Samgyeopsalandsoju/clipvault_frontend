import { api } from '@/libs/api';
import { LoginFormValue, RegisterFormValue } from '@/types/auth';
import { signIn } from 'next-auth/react';

// 회원 가입
export const register = async (data: RegisterFormValue) => {
  // confirmPassword 삭제
  const { confirmPassword, ...userJson } = data;
  const response = await api.post('/auth/register/user', userJson);
  return response.request;
};

export const login = async (data: LoginFormValue) => {
  const response = await signIn('credentials', {
    mail: data.mail,
    password: data.password,
    redirect: false,
  });

  if (!response?.ok) {
    throw new Error(`error occurred : ${response?.error}`);
  }
};
