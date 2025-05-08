const hexToHsl = (hex: string) => {
  // # 제거
  hex = hex.replace(/^#/, '');

  // rgb 추출
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const hslToHex = (h: number, s: number, l: number, a?: number) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  if (a !== undefined) {
    const alpha = Math.round(a * 255)
      .toString(16)
      .padStart(2, '0');
    return hex + alpha;
  }

  return hex;
};

export const generateModernTagColors = (hex: string) => {
  if (hex === '999')
    return {
      original: hex,
      text: '#000',
      background: '#fff',
      border: '#000',
    };

  // 헥스를 HSL로 변환하여 Hue 추출
  const [hue, _, __] = hexToHsl(hex);

  // 배경색: 투명도를 낮추고 밝기 조절
  const background = hslToHex(hue, 90, 50, 1);

  // 텍스트 색상: 더 밝게 (거의 흰색에 가깝게)
  const text = hslToHex(hue, 20, 95);

  // 테두리 색상: 더 선명하게, 약간의 투명도
  // 채도를 85%로, 밝기를 45%로 조정
  const border = hslToHex(hue, 85, 45, 0.2);

  return {
    original: hex,
    hue,
    background,
    text,
    border,
  };
};
