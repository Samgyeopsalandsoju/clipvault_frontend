'use client';

import { Button } from '@/shared/ui/button';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <Button className="text-sm" variant="link" onClick={handleLogout}>
      Logout
    </Button>
  );
};
