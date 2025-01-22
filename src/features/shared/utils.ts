import { css } from 'styled-components';

// 색 생성기
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

export const getHSLNeonStyles = (baseHSL: string) => {
  const parseHSL = (hslString: string) => {
    // 더 유연한 정규식 패턴으로 수정
    // 공백을 더 유연하게 처리하고, 쉼표 앞뒤의 공백도 허용
    const matches = hslString.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);

    if (!matches) {
      console.error('HSL 파싱 실패:', hslString);
      // 기본값 반환하여 에러 방지
      return {
        h: 0,
        s: 0,
        l: 0,
      };
    }

    return {
      h: parseInt(matches[1]),
      s: parseInt(matches[2]),
      l: parseInt(matches[3]),
    };
  };

  const { h, s, l } = parseHSL(baseHSL);

  // 네온 효과를 위한 색상들 생성
  const lighterHSL = `hsl(${h}, ${s}%, ${Math.min(l + 20, 100)}%)`;
  const glow1 = `hsl(${h}, ${Math.min(s + 10, 100)}%, ${Math.min(l + 15, 100)}%)`;
  const glow2 = `hsl(${h}, ${Math.min(s + 20, 100)}%, ${Math.min(l + 10, 100)}%)`;
  const glow3 = `hsl(${h}, ${Math.min(s + 30, 100)}%, ${Math.min(l + 5, 100)}%)`;

  return css`
    background-color: ${baseHSL};
    border: 2px solid ${lighterHSL};
    box-shadow: 0 0 5px ${glow1}, 0 0 10px ${glow2}, 0 0 15px ${glow3};
    transition: all 0.3s ease;

    &:hover {
      border-color: ${lighterHSL};
      box-shadow: 0 0 8px ${glow1}, 0 0 16px ${glow2}, 0 0 24px ${glow3};
    }
  `;
};

// 메탈릭 스타일을 위한 믹스인 정의
export const metallicStyles = {
  gold: css`
    background: linear-gradient(to right, #b8860b, #ffd700, #b8860b);
    border: 2px solid rgba(184, 134, 11, 0.3);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: linear-gradient(to right, #daa520, #ffd700, #daa520);
      box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.2);
    }
  `,
  silver: css`
    background: linear-gradient(to right, #a9a9a9, #e0e0e0, #a9a9a9);
    border: 2px solid rgba(169, 169, 169, 0.3);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background: linear-gradient(to right, #c0c0c0, #e0e0e0, #c0c0c0);
      box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  bronze: css`
    background: linear-gradient(to right, #8b4513, #cd853f, #8b4513);
    border: 2px solid rgba(139, 69, 19, 0.3);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: linear-gradient(to right, #a0522d, #cd853f, #a0522d);
      box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.2);
    }
  `,
};
