import { useMutation } from '@tanstack/react-query';
import { sendVerifyCode } from '../service';
import { useToast } from '@/shared/hooks/useToast';
import { useState } from 'react';
import { useVerificationStore } from '../model/store';

export const useSendVerifyCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // 인증 아이디 저장 스토어
  const setMail = useVerificationStore((state) => state.setMail);
  const setAuthKey = useVerificationStore((state) => state.setAuthKey);

  const sendVerifyCodeMutation = useMutation({
    mutationFn: sendVerifyCode,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: ({ data }, mail) => {
      // 인증 스토어에 값 저장
      setAuthKey(data.result);
      setMail(mail);

      toast.success('이메일 인증 코드가 발송되었습니다.');
    },
    onError: () => {
      toast.error('이메일 인증 코드 발송에 실패했습니다.');
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return {
    sendCode: sendVerifyCodeMutation.mutate,
    isLoading,
  };
};
