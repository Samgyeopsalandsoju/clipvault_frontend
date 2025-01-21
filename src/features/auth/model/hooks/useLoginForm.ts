import { useSetAtom } from 'jotai';
import { authModeAtom } from '../auth.atom';
import { useRememberMe } from './userRememberMe';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValue } from '../auth.types';

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
