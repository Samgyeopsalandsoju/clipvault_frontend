import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { LoginFormData } from '../model/type';
export const useLoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return { register, handleSubmit: handleSubmit(onSubmit) };
};
