'use client';

import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';
import { useAtom } from 'jotai';
import { RememberMeAtom } from '@/features/auth/atom';

export const useRememberMe = () => {
  // const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useAtom(RememberMeAtom);

  useEffect(() => {
    const remembered = !!localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    setRememberMe(remembered);
  }, []);

  const saveUsername = (username: string) => {
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, username);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    }
  };

  const getSaveUsername = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) || '';
    }
    return '';
  };

  return {
    rememberMe,
    setRememberMe,
    saveUsername,
    getSaveUsername,
  };
};
