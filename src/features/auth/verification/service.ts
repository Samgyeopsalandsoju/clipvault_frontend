import { apiClient } from '@/shared/lib/axios';

export const sendVerifyCode = async (mail: string) => {
  const res = await apiClient.post('/auth/send-verify', {
    mail,
  });
  return res;
};

export const checkVerifyCode = async (data: {
  authCode: string;
  authKey: string;
  mail: string;
}) => {
  const res = await apiClient.post('/auth/check-verify', data);
  return res.data.status;
};
