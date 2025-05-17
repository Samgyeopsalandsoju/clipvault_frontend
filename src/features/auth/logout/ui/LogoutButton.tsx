'use client';

import { Button } from '@/shared/ui/shadcn';
import { signOut } from 'next-auth/react';

export const LogoutButton = ({ color }: { color?: string }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <Button className={`text-sm`} variant="link" onClick={handleLogout} style={{ color: color ? color : 'black' }}>
      Logout
    </Button>
  );
};
