'use client';

import { useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants';
import { useRememberMeStore } from '@/stores';

export const useRememberMe = () => {
  const { rememberMe, setRememberMe } = useRememberMeStore();

  useEffect(() => {
    const remembered = !!localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    setRememberMe(remembered);
  }, [setRememberMe]);

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
