import { useSetAtom } from 'jotai';
import { authModeAtom } from '../../atoms/auth.atom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRememberMe } from './userRememberMe';
import { LoginFormValue } from '@/types/auth';

export const useLoginForm = () => {
  const { saveUsername, getSaveUsername } = useRememberMe();
  const setMode = useSetAtom(authModeAtom);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<LoginFormValue>({
    defaultValues: {
      email: getSaveUsername(),
    },
    mode: 'onChange',
  });

  const handleClick = () => {
    setMode('register');
  };

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    console.log('form data', data);
    saveUsername(data.email);
  };
  return {
    register,
    handleSubmit,
    trigger,
    handleClick,
    onSubmit,
    errors,
  };
};
