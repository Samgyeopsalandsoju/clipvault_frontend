import { createToast } from '@/libs/hot-toast';
import { register } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authModeAtom } from '@/atoms/auth.atom';

export const useAuth = () => {
  const toast = createToast();
  const setMode = useSetAtom(authModeAtom);
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('You have successfully sign up!');
      setMode('login');
    },
  });

  return {
    register: registerMutation.mutate,
  };
};
