import { createToast } from '@/libs/toast/toast.config';
import { sendVerifyEmail, verifyEmailCheck } from '@/services';
import { useMutation } from '@tanstack/react-query';

export const useVerifyCode = () => {
  const toast = createToast();

  // 이메일 인증 체크
  const verifyCheckMutation = useMutation({
    mutationFn: verifyEmailCheck,
    onSuccess: () => {
      toast.success('Successfully verified!');
    },
    onError: () => {
      toast.error('Failed to verify');
    },
  });

  // 이메일 인증 코드 발송
  const sendVerifyEmailMutation = useMutation({
    mutationFn: sendVerifyEmail,
    onSuccess: () => {
      toast.success('Successfully Email send,');
    },
  });

  return {
    sendEmail: sendVerifyEmailMutation.mutateAsync,
    checkCode: verifyCheckMutation.mutateAsync,
  };
};
