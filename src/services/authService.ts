import { api } from '@/libs/axios/instance';
import { RegisterFormValue } from '@/types/auth';

// 회원 가입
export const register = async (data: RegisterFormValue) => {
  // confirmPassword 삭제
  const { confirmPassword, ...userJson } = data;
  const response = await api.post('/auth/register/user', userJson);
  return response.request;
};
