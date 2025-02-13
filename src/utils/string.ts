export const generateUniqueId = () => {
  // 타임스탬프 + 랜덤 문자열 조합
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const normalizeInput = (value: string) => {
  return value.trim().toUpperCase();
};
