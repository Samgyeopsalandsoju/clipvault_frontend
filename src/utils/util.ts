export const generateModernTagColors = (hue?: number) => {
  // 색상(Hue): 지정된 값이 없으면 랜덤 생성
  const colorHue = hue ?? Math.floor(Math.random() * 360);

  // 배경색: 더 선명한 색상, 30% 투명도
  // 채도를 90%로 높이고, 밝기를 40%로 조정
  const background = `hsla(${colorHue}, 90%, 40%, 0.3)`;

  // 텍스트 색상: 더 밝고 선명하게
  // 채도를 90%로, 밝기를 80%로 높임
  const text = `hsl(${colorHue}, 90%, 80%)`;

  // 테두리 색상: 더 선명하게, 약간의 투명도
  // 채도를 85%로, 밝기를 45%로 조정
  const border = `hsla(${colorHue}, 85%, 45%, 0.2)`;

  return {
    colorHue,
    background,
    text,
    border,
  };
};
