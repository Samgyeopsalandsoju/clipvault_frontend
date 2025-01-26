import { css } from 'styled-components';

// 색 생성기
// export const generateSoftColor = (): string => {
//   // 색상(Hue): 0-360의 모든 범위 허용
//   // 빨강(0), 노랑(60), 초록(120), 청록(180), 파랑(240), 보라(300) 등 모든 색상 가능
//   const hue = Math.floor(Math.random() * 360);
//   // 채도(Saturation): 20-40% 범위로 제한
//   const saturation = Math.floor(Math.random() * 20) + 20;
//   // 밝기(Lightness): 60-80% 범위로 제한
//   const lightness = Math.floor(Math.random() * 20) + 60;
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// };

export const generateSoftColor = (): string => {
  // 부드러운 파스텔톤을 위한 색상 범위 설정
  const hueRanges = [
    [0, 30], // 따뜻한 레드-오렌지 계열
    [45, 70], // 부드러운 옐로우 계열
    [80, 150], // 내추럴 그린 계열
    [170, 200], // 차분한 청록 계열
    [210, 230], // 깊이있는 블루 계열
    [300, 330], // 세련된 퍼플 계열
  ];

  // 랜덤하게 색상 범위 선택
  const selectedRange = hueRanges[Math.floor(Math.random() * hueRanges.length)];
  const hue = Math.floor(Math.random() * (selectedRange[1] - selectedRange[0])) + selectedRange[0];

  // 채도는 더 낮게 조정하여 부드러운 느낌 강화
  const saturation = Math.floor(Math.random() * 15) + 25; // 25-40% 범위

  // 밝기는 테마와 어울리도록 조정
  const lightness = Math.floor(Math.random() * 15) + 65; // 65-80% 범위

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const generateUniqueId = () => {
  // 타임스탬프 + 랜덤 문자열 조합
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
