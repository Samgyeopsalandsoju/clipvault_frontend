import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormValue } from '../auth.types';
import { useRegisterValidation } from './useRegisterValidation';

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
