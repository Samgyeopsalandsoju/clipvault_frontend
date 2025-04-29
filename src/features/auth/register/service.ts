import { apiClient } from '@/app/lib';
import { RegisterFormData } from './model/type';

// 회원가입 서비스 레이어
export const register = async (data: RegisterFormData) => {
  const { confirmPassword, ...userJson } = data;
  const res = await apiClient.post('/auth/register/user', userJson);
  return res;
};
