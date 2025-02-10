import { useForm } from 'react-hook-form';
import { useRegisterValidation } from './useRegisterValidation';
import { RegisterFormValue } from '@/types/auth';
import { useAuth } from './useAuth';

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

  const onSubmit = (data: RegisterFormValue) => {
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
