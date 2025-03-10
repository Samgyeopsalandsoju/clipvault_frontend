import { useMutation } from '@tanstack/react-query';
import { useAuthModal } from '@/hooks';
import { getForkedClips, login, register } from '@/services';
import { createToast } from '@/libs/toast';
import { useSessionStore } from '@/stores';

export const useAuth = () => {
  const toast = createToast();
  const { setModalMode, setIsAuthModalOpen } = useAuthModal();
  const { setIsAuthenticated } = useSessionStore();
  // 회원가입
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('You have successfully sign up!');
      setModalMode('login');
    },
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setIsAuthModalOpen(false);
      setIsAuthenticated(true);
      toast.success('Successfully logged in');
    },
    onError: (error) => {
      if (error.message.includes('CredentialsSignin')) {
        toast.error('Please check your email and password.');
      } else {
        toast.error('Login failed. Please try again later.');
      }
    },
  });

  return {
    register: registerMutation.mutate,
    signIn: loginMutation.mutateAsync,
  };
};
