import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from '@/shared/ui/input-otp';
import { Modal } from '@/shared/ui/Modal';
import { Loader2 } from 'lucide-react';
import { VerifyModalProps } from '../model/type';
import { useEffect, useState } from 'react';
import { useVerificationStore, useVerifyStore } from '../model/store';
import { useCheckVerifyCode } from '../hooks/useCheckVerifyCode';

const VerifyModal = ({ isOpen, onClose, isLoading: sendingEmailLoading }: VerifyModalProps) => {
  const [authCode, setAuthCode] = useState<string>('');
  // 인증 코드 저장 스토어
  const { mail, authKey, reset } = useVerificationStore.getState();
  const { verifyCode } = useCheckVerifyCode();
  const setIsVerified = useVerifyStore((state) => state.setIsVerified);

  // 인증하기
  const checkVerifyCode = async () => {
    // 스토어 값 확인
    if (!authCode || !mail || !authKey) return;
    // 인증 코드 확인
    const status = await verifyCode({ authCode, mail, authKey });
    if (status) {
      // 모달창 닫기
      onClose();
      // 인증코드 초기화
      setAuthCode('');
      // 스토어 리셋
      reset();
      // 인증 여부 확인
      setIsVerified(true);
    }
  };

  // opt 값이 전부 작성되면 checkVerifyCode 함수 호출
  useEffect(() => {
    if (authCode.length === 6) {
      checkVerifyCode();
    }
  }, [authCode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center bg-white rounded-lg w-[350px] h-[250px] shadow-md">
        {/** 이메일 발송 중 */}
        {sendingEmailLoading ? (
          <div className="flex items-center justify-center flex-col gap-2">
            <Loader2 size={40} className="animate-spin" />
            <p className="text-lg font-semibold">인증 이메일 발송중....</p>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-10">
            <p className="text-lg font-semibold">인증을 완료해 주세요!</p>
            <div>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={setAuthCode}
                value={authCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VerifyModal;
