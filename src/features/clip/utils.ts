export const generateSoftColor = (): string => {
  // 색상(Hue): 0-360의 모든 범위 허용
  // 빨강(0), 노랑(60), 초록(120), 청록(180), 파랑(240), 보라(300) 등 모든 색상 가능
  const hue = Math.floor(Math.random() * 360);
  // 채도(Saturation): 20-40% 범위로 제한
  const saturation = Math.floor(Math.random() * 20) + 20;
  // 밝기(Lightness): 60-80% 범위로 제한
  const lightness = Math.floor(Math.random() * 20) + 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
