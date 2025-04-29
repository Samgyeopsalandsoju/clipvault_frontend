'use client';

import { Button } from '@/shared/ui/button';
import VerifyModal from './VerifyModal';
import { VerifyButtonProps } from '../model/type';
import { useSendVerifyCode } from '../hooks/useSendVerifyCode';
import { verifyCodeValidation } from '../model/validation';
import { useToast } from '@/shared/hooks/useToast';

const VerifyButton = ({ mail, isOpen, onClose, onClick, disabled }: VerifyButtonProps) => {
  const toast = useToast();
  const { sendCode, isLoading } = useSendVerifyCode();

  // 이메일 인증 코드 발송 버튼 클릭 시 실행 및 팝업창 오픈
  const handleSendCode = () => {
    // 이메일 형식 검증
    if (!mail.match(verifyCodeValidation.mail.pattern)) {
      toast.error(verifyCodeValidation.mail.message);
      return;
    }
    onClick();
    // 인증 메일 전송
    sendCode(mail);
  };

  return (
    <>
      <Button
        type="button"
        className="w-full mt-4"
        variant="outline"
        onClick={handleSendCode}
        disabled={disabled}
      >
        이메일 인증 코드 발송
      </Button>
      <VerifyModal isOpen={isOpen} onClose={onClose} isLoading={isLoading} />
    </>
  );
};

export default VerifyButton;
