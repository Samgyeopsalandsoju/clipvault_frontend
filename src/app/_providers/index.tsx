'use client';

import { NextAuthProvider } from './NextAuthProvider';
import QueryProvider from './QueryProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NextAuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </NextAuthProvider>
    </QueryProvider>
  );
}
