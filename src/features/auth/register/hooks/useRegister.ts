import { useMutation } from '@tanstack/react-query';
import { register } from '../service';
import { useToast } from '@/shared/hooks/useToast';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const toast = useToast();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('회원가입에 성공하였습니다!');
      router.push('/home');
    },
    onError: () => {
      toast.error('회원가입에 실패하였습니다.');
    },
  });

  return { registerUser: registerMutation.mutate, isLoading: registerMutation.isPending };
};
