'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

function ThemeComponent({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();

  // console.log('System theme:', systemTheme);
  // const currentTheme = systemTheme === 'dark' ? darkTheme : lightTheme;
  return <StyledThemeProvider theme={darkTheme}>{children}</StyledThemeProvider>;
}

function ReactQueryProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
export function AllProvider({ children }: { children: React.ReactNode }) {
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
        light: 'light',
        dark: 'dark',
        system: 'system',
      }}
    >
      <SessionProvider>
        <ReactQueryProviders>
          <ThemeComponent>
            <Toaster />
            {children}
          </ThemeComponent>
        </ReactQueryProviders>
      </SessionProvider>
    </NextThemesProvider>
  );
}
