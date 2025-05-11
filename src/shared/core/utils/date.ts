export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  // 월은 0부터 시작하므로 +1 해주고, 2자리 문자열로 변환
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
