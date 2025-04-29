export const loginValidation = {
  mail: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: '이메일 형식이 올바르지 않습니다.',
    },
  },
  password: {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상이어야 합니다.',
    },
  },
};
