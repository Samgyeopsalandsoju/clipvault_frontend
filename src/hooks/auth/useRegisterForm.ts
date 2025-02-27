'use client';

import { RegisterFormValue } from '@/types';
import { useForm } from 'react-hook-form';
import { useAuth, useRegisterValidation } from '@/hooks';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    mode: 'onChange',
  });
  const validator = useRegisterValidation(watch);
  const { register: signUp } = useAuth();

  const onSubmit = async (data: RegisterFormValue) => {
    signUp(data);
  };

  return {
    watch,
    control,
    register,
    handleSubmit,
    trigger,
    errors,
    validator,
    onSubmit,
    setValue,
  };
};
