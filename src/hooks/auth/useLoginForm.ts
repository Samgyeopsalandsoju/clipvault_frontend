'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth, useRememberMe } from '@/hooks';
import { LoginFormValue } from '@/types';
import { useAuthModeStore } from '@/stores/useAuthModeStore';
import { useState } from 'react';

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { saveUsername, getSaveUsername } = useRememberMe();
  const { setMode } = useAuthModeStore();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValue>({
    defaultValues: {
      mail: getSaveUsername(),
    },
    mode: 'onChange',
  });

  const handleClick = () => {
    setMode('register');
  };

  const onSubmit: SubmitHandler<LoginFormValue> = async (data) => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);

      saveUsername(data.mail);
      await signIn(data);
    } catch (error) {
      console.error('Error: ', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    trigger,
    handleClick,
    onSubmit,
    errors,
    isLoading,
  };
};
