import { useSetAtom } from 'jotai';
import { authModeAtom } from '../../atoms/auth.atom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRememberMe } from './userRememberMe';
import { LoginFormValue } from '@/types/auth';
import { useAuth } from './useAuth';

export const useLoginForm = () => {
  const { saveUsername, getSaveUsername } = useRememberMe();
  const setMode = useSetAtom(authModeAtom);
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

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    saveUsername(data.mail);
    signIn(data);
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
