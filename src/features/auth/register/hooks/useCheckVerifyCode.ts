import { useMutation } from '@tanstack/react-query';
import { checkVerifyCode } from '../service';
import { useToast } from '@/shared/core/hooks/useToast';
import { useRegisterStore } from '../model/store';

export const useCheckVerifyCode = () => {
  const toast = useToast();
  const setVerifiedMail = useRegisterStore((state) => state.setVerifiedMail);

  const verifyCodeMutation = useMutation({
    mutationFn: checkVerifyCode,
    onSuccess: ({ body }) => {
      // 인증 이메일 저장
      setVerifiedMail(body);
      toast.success('인증에 성공하였습니다!');
    },
    onError: () => {
      toast.error('인증에 실패하였습니다.');
    },
  });

  return {
    verifyCode: verifyCodeMutation.mutate,
    isLoading: verifyCodeMutation.isPending,
  };
};
