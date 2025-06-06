import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS } from '@/shared/ui/shadcn';
import { Loader2 } from 'lucide-react';
import { VerifyModalProps } from '../model/type';
import { useEffect, useState } from 'react';
import { useVerifyCodeStore } from '../model/store';
import { Modal } from '@/shared/ui/modal/Modal';
import { useCheckVerifyCode } from '../hooks/useCheckVerifyCode';

export const VerifyModal = ({ isOpen, onClose, isLoading: isSendCodeLoading }: VerifyModalProps) => {
  const [authCode, setAuthCode] = useState<string>('');
  // 인증 코드 저장 스토어
  const { mail, authKey, reset } = useVerifyCodeStore.getState();
  const { verifyCode, isLoading } = useCheckVerifyCode();
  // 인증 여부 설정 스토어
  const setIsVerified = useVerifyCodeStore((state) => state.setIsVerified);

  // 인증하기
  const checkVerifyCode = async () => {
    // 스토어 값 확인
    if (!authCode || !mail || !authKey) return;
    // 인증 코드 확인
    verifyCode(
      { authCode, mail, authKey },
      {
        onSuccess: () => {
          onClose();
          // 인증코드 초기화
          setAuthCode('');
          // 스토어 리셋
          reset();
          // 인증 여부 확인
          setIsVerified(true);
        },
      }
    );
  };

  // authCode 값이 전부 작성되면 checkVerifyCode 함수 호출
  useEffect(() => {
    if (authCode.length === 6) {
      checkVerifyCode();
    }
  }, [authCode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center bg-white rounded-lg w-[350px] h-[250px] shadow-md">
        {/** 이메일 발송 중 */}
        {isSendCodeLoading ? (
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
                pattern={REGEXP_ONLY_DIGITS}
                onChange={setAuthCode}
                value={authCode}
                // 인증 코드 확인 중 버튼 비활성화
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  {/* </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup> */}
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
