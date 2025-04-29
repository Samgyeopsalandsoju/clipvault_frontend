import { LoginFormData } from './model/type';
import { signIn } from 'next-auth/react';

export const loginWithNextAuth = async (data: LoginFormData) => {
  try {
    const res = await signIn('credentials', {
      mail: data.mail,
      password: data.password,
      redirect: false,
    });

    return res;
  } catch (error) {
    console.error('로그인 API 호출 중 예외 발생:', error);
    throw new Error('서버 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
  }
};
