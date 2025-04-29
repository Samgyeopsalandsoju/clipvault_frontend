// 인증 코드 발송
export type VerifyCode = {
  mail: string;
  code: string;
};

// 인증 버튼 컴포넌트 타입
export type VerifyButtonProps = {
  onClose: () => void;
  isOpen: boolean;
  mail: string;
  onClick: () => void;
  disabled: boolean;
};

export type VerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
};
