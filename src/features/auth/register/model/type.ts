// 회원가입 폼 데이터
export type RegisterFormData = {
  mail: string;
  password: string;
  verifiedMail: string;
  confirmPassword: string;
};

// 회원가입 스토어
export interface IRegisterStore {
  verifiedMail: string | null;
  setVerifiedMail: (verifiedMail: string | null) => void;
}

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
  onOpenModal: () => void;
  disabled: boolean;
};

export type VerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
};

export interface IVerifiedCodeStore {
  // 인증여부
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
  // 인증 과정 정보
  authKey: string | null;
  mail: string | null;
  setMail: (mail: string | null) => void;
  setAuthKey: (authKey: string | null) => void;
  reset: () => void;
}
