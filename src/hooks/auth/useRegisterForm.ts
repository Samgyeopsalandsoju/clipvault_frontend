import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterValidation } from './useRegisterValidation';
import { RegisterFormValue } from '@/types/auth';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    mode: 'onChange',
  });
  const validator = useRegisterValidation(watch);

  const onSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    console.log('form data', data);
  };
  return { register, handleSubmit, trigger, errors, validator, onSubmit };
};
