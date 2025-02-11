import { createToast } from '@/libs/hot-toast';
import { login, register } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useAuthModal } from './useAuthModal';

export const useAuth = () => {
  const toast = createToast();
  const { setMode, setIsOpen } = useAuthModal();
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('You have successfully sign up!');
      setMode('login');
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  return {
    register: registerMutation.mutate,
    signIn: loginMutation.mutate,
  };
};
