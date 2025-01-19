'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyles';

function ThemeComponent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  console.log(theme);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  return <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>;
}

// 메인 ThemeProvider 컴포넌트
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <ThemeComponent>
        <GlobalStyles />
        {children}
      </ThemeComponent>
    </NextThemesProvider>
  );
}
