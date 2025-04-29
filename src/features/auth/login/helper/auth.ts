import { ErrorAuth } from '../model/type';

// next-auth 로그인 에러 타입 설정
export const setErrorType = (error: string | null): ErrorAuth => {
  let errorObj: ErrorAuth;

  if (error === 'CredentialsSignin') {
    errorObj = {
      code: 'CredentialsSignin',
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
    };
  } else {
    // 그외 에러
    errorObj = {
      code: 'unknown',
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }

  return errorObj;
};
