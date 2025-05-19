'use client';

import { VerifyButtonProps } from '../model/type';
import { useSendVerifyCode } from '../hooks/useSendVerifyCode';
import { verifyCodeValidation } from '../model/validation';
import { useToast } from '@/shared/core/hooks/useToast';
import { VerifyModal } from './VerifyModal';
import { Button } from '@/shared/ui/shadcn';

export const VerifyButton = ({ mail, isOpen, onClose, onOpenModal, disabled }: VerifyButtonProps) => {
  const toast = useToast();
  const { sendCode, isLoading: isSendCodeLoading } = useSendVerifyCode();

  // 이메일 인증 코드 발송 버튼 클릭 시 실행 및 팝업창 오픈
  const handleSendCode = () => {
    // 이메일 형식 검증
    if (!mail.match(verifyCodeValidation.mail.pattern)) {
      toast.error(verifyCodeValidation.mail.message);
      return;
    }
    // 모달 오픈
    onOpenModal();
    // 인증 메일 전송
    sendCode(mail);
  };

  return (
    <>
      <Button type="button" className="w-full mt-4" variant="outline" onClick={handleSendCode} disabled={disabled}>
        이메일 인증 코드 발송
      </Button>
      {/** 인증 모달 */}
      <VerifyModal isOpen={isOpen} onClose={onClose} isLoading={isSendCodeLoading} />
    </>
  );
};
