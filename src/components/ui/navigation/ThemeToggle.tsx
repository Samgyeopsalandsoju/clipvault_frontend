'use client';

import styled, { keyframes, css } from 'styled-components';
// 애니메이션 정의
const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const moveCloud = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

// 컴포넌트 크기 설정을 위한 상수
const SIZES = {
  small: { width: '80px', height: '38px', buttonSize: '32px', iconSize: '20px' },
  medium: { width: '100px', height: '48px', buttonSize: '40px', iconSize: '24px' },
  large: { width: '120px', height: '58px', buttonSize: '48px', iconSize: '28px' },
};

interface ToggleContainerProps {
  $isDark: boolean;
  $size?: 'small' | 'medium' | 'large';
}

// 토글 컨테이너 스타일링
const ToggleContainer = styled.button<ToggleContainerProps>`
  position: relative;
  width: ${({ $size = 'medium' }) => SIZES[$size].width};
  height: ${({ $size = 'medium' }) => SIZES[$size].height};
  border-radius: ${({ $size = 'medium' }) => `${parseInt(SIZES[$size].height) / 2}px`};
  padding: 4px;
  cursor: pointer;
  overflow: hidden;
  border: none;
  outline: none;
  transition: transform 0.3s ease-in-out;
  background: ${({ $isDark }) =>
    $isDark ? 'linear-gradient(90deg, #1A237E 0%, #000051 100%)' : 'linear-gradient(90deg, #87CEEB 0%, #1976d2 100%)'};

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#000000')};
  }
`;

// 토글 버튼 (해/달이 있는 원)
const ToggleButton = styled.div<ToggleContainerProps>`
  position: absolute;
  width: ${({ $size = 'medium' }) => SIZES[$size].buttonSize};
  height: ${({ $size = 'medium' }) => SIZES[$size].buttonSize};
  border-radius: 50%;
  background-color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#FFD700')};
  transition: transform 0.5s ease-in-out, background-color 0.5s ease-in-out;
  transform: translateX(
    ${({ $isDark, $size = 'medium' }) =>
      $isDark ? `${parseInt(SIZES[$size].width) - parseInt(SIZES[$size].buttonSize) - 8}px` : '0'}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

interface CloudProps {
  $size: string;
  $top: string;
  $left: string;
  $isDark: boolean;
  $delay?: string;
}

// 구름 스타일링
const Cloud = styled.div<CloudProps>`
  position: absolute;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};

  ${({ $isDark, $delay = '0s' }) =>
    !$isDark &&
    css`
      animation: ${moveCloud} 20s linear infinite;
      animation-delay: ${$delay};
    `}

  opacity: ${({ $isDark }) => ($isDark ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }

  &::before {
    width: 15px;
    height: 15px;
    top: -6px;
    left: 3px;
  }

  &::after {
    width: 12px;
    height: 12px;
    top: -3px;
    left: 13px;
  }
`;

interface StarProps {
  $delay?: string;
  style?: React.CSSProperties;
}

// 별 스타일링
const Star = styled.div<StarProps>`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: #ffffff;
  border-radius: 50%;
  animation: ${twinkle} 1.5s infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: inherit;
    opacity: 0.5;
    filter: blur(1px);
  }
`;

// 해/달 아이콘 스타일링
const SunIcon = styled.div<{ $size?: 'small' | 'medium' | 'large' }>`
  width: ${({ $size = 'medium' }) => SIZES[$size].iconSize};
  height: ${({ $size = 'medium' }) => SIZES[$size].iconSize};
  background-color: #ffa000;
  border-radius: 50%;
  position: relative;
  animation: ${spin} 20s linear infinite;

  &::after {
    content: '';
    position: absolute;
    top: -30%;
    left: 50%;
    width: 15%;
    height: 160%;
    background: repeating-linear-gradient(90deg, #ffa000 0px, #ffa000 2px, transparent 2px, transparent 6px);
  }
`;

const MoonIcon = styled.div<{ $size?: 'small' | 'medium' | 'large' }>`
  width: ${({ $size = 'medium' }) => SIZES[$size].iconSize};
  height: ${({ $size = 'medium' }) => SIZES[$size].iconSize};
  background-color: #757575;
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 8px;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 50%;
  }
`;

interface ThemeToggleProps {
  isDark: boolean;
  onChange: () => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ThemeToggle = ({ isDark, onChange, size = 'medium', className }: ThemeToggleProps) => {
  const toggleLabel = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <ToggleContainer $isDark={isDark} $size={size} onClick={onChange} aria-label={toggleLabel} className={className}>
      {/* 배경 구름들 */}
      <Cloud $size="20px" $top="8px" $left="8px" $isDark={isDark} $delay="0s" />
      <Cloud $size="16px" $top="16px" $left="32px" $isDark={isDark} $delay="2s" />

      {/* 별들 - 다크 모드에서만 보임 */}
      {isDark && (
        <>
          <Star style={{ top: '8px', left: '16px' }} />
          <Star $delay="0.3s" style={{ top: '16px', left: '32px' }} />
          <Star $delay="0.6s" style={{ top: '8px', left: '48px' }} />
          <Star $delay="0.9s" style={{ top: '20px', left: '70px' }} />
        </>
      )}

      {/* 토글 버튼 */}
      <ToggleButton $isDark={isDark} $size={size}>
        {isDark ? <MoonIcon $size={size} /> : <SunIcon $size={size} />}
      </ToggleButton>
    </ToggleContainer>
  );
};
