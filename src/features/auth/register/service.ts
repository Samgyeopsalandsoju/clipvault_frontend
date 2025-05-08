import { apiClient } from '@/shared/core/lib/axios';
import { RegisterFormData } from './model/type';

// 회원가입 서비스 레이어
export const register = async (data: RegisterFormData) => {
  // 비밀번호 확인 제거
  const { confirmPassword, ...userJson } = data;
  const res = await apiClient.post('/auth/register/user', userJson);
  return res;
};
