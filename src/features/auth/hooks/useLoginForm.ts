import { useForm } from 'react-hook-form';
import { LoginFormData } from '../model/type';
import { useAuth } from './useAuth';

export const useLoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return { register, handleSubmit: handleSubmit(onSubmit) };
};
