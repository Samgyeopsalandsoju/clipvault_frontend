import { apiClient } from '@/app/lib';
import { RegisterFormData } from './model/type';

export const register = async (data: RegisterFormData) => {
  const { confirmPassword, ...userJson } = data;
  const res = await apiClient.post('/auth/register/user', userJson);
  console.log(res);
  return res;
};
