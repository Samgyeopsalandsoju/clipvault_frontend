// 로그인 폼 데이터
export type LoginFormData = {
  mail: string;
  password: string;
};

// 로그인 실패 시 에러 타입
export type ErrorAuth = {
  code: string;
  message: string;
};
