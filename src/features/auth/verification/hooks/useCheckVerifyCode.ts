import { useMutation } from '@tanstack/react-query';
import { checkVerifyCode } from '../service';
import { useToast } from '@/shared/core/hooks/useToast';

export const useCheckVerifyCode = () => {
  const toast = useToast();
  const verifyCodeMutation = useMutation({
    mutationFn: checkVerifyCode,
    onSuccess: () => {
      toast.success('인증에 성공하였습니다!');
    },
    onError: () => {
      toast.error('인증에 실패하였습니다.');
    },
  });

  return {
    verifyCode: verifyCodeMutation.mutateAsync,
    isLoading: verifyCodeMutation.isPending,
  };
};
