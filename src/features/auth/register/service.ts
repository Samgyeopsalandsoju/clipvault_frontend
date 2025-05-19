import { apiClient } from '@/shared/core/lib/axios';
import { RegisterFormData } from './model/type';
import { APIResponse } from '@/shared/data/types';

// 회원가입 서비스 레이어
export const register = async (data: RegisterFormData) => {
  // 비밀번호 확인 제거
  const { confirmPassword, ...userJson } = data;
  console.log(userJson);
  const res = await apiClient.post('/auth/register/user', userJson);
  return res;
};
// 인증 번호 메일 전송
export const sendVerifyCode = async (mail: string) => {
  const res = await apiClient.post('/auth/send-verify', {
    mail,
  });
  return res;
};
// 인증 번호 확인
export const checkVerifyCode = async (data: { authCode: string; authKey: string; mail: string }) => {
  const res = await apiClient.post<APIResponse<string>>('/auth/check-verify', data);
  return res.data;
};
