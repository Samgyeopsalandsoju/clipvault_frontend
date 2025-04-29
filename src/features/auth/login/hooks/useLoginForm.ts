import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import { LoginFormData } from '../model/type';

// 로그인 폼 훅
export const useLoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return { register, handleSubmit: handleSubmit(onSubmit) };
};
