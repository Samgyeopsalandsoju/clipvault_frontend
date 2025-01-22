'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import { useAtomValue } from 'jotai';
import { themeModeAtom } from '@/features/shared/atoms';

function ThemeComponent({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const isDark = useAtomValue(themeModeAtom);

  // console.log('Current theme:', theme);
  // console.log('System theme:', systemTheme);
  // const currentTheme = systemTheme === 'dark' ? darkTheme : lightTheme;
  const currentTheme = isDark ? darkTheme : lightTheme;
  return <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class" // HTML에 적용될 속성
      defaultTheme="system" // 기본 테마 설정
      enableSystem={true} // 시스템 테마 감지 활성화
      value={{
        // 사용 가능한 테마 정의
        light: 'light',
        dark: 'dark',
        system: 'system',
      }}
    >
      <ThemeComponent>
        <GlobalStyles />
        {children}
      </ThemeComponent>
    </NextThemesProvider>
  );
}
