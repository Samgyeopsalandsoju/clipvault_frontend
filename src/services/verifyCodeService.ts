import { api } from '@/libs/axios/instance';

export const sendVerifyEmail = async (data: string) => {
  const response = await api.post('/auth/register/sendEmail', { mail: data });
  return response.data;
};

export const verifyEmailCheck = async (data: { mail: string; authCode: string; authKey: string }) => {
  const response = await api.post('/auth/register/verifyCode', data);
  console.log('response', response.data);
  return response.data.body;
};
