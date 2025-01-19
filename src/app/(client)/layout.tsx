import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ maxWidth: '480px', margin: '0 auto' }}>{children}</div>;
}
