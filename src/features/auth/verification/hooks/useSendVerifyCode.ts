import { useMutation } from '@tanstack/react-query';
import { sendVerifyCode } from '../service';
import { useToast } from '@/shared/hooks/useToast';
import { useVerificationStore } from '../model/store';

export const useSendVerifyCode = () => {
  const toast = useToast();

  // 인증 아이디 저장 스토어
  const setMail = useVerificationStore((state) => state.setMail);
  const setAuthKey = useVerificationStore((state) => state.setAuthKey);

  const sendVerifyCodeMutation = useMutation({
    mutationFn: sendVerifyCode,
    onSuccess: ({ data }, mail) => {
      // 인증 스토어에 값 저장
      setAuthKey(data.result);
      setMail(mail);

      toast.success('이메일 인증 코드가 발송되었습니다.');
    },
    onError: () => {
      // 초기화
      setAuthKey(null);
      setMail(null);

      toast.error('이메일 인증 코드 발송에 실패했습니다.');
    },
  });

  return {
    sendCode: sendVerifyCodeMutation.mutate,
    isLoading: sendVerifyCodeMutation.isPending,
  };
};
