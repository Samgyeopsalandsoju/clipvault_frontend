export const verifyCodeValidation = {
  mail: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '이메일 형식이 올바르지 않습니다.',
  },
  code: {
    required: '코드를 입력해주세요.',
  },
};
