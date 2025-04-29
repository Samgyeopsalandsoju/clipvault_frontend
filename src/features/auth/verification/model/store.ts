import { create } from 'zustand';

interface VerifyStore {
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
}
// 인증 여부 확인 스토어
export const useVerifyStore = create<VerifyStore>((set) => ({
  isVerified: false,
  setIsVerified: (isVerified: boolean) => set({ isVerified }),
}));

interface VerificationStore {
  authKey: string | null;
  mail: string | null;
  setMail: (mail: string | null) => void;
  setAuthKey: (authKey: string | null) => void;
  reset: () => void;
}

// 인증 코드 및 인증 아이디 스토어
export const useVerificationStore = create<VerificationStore>((set) => ({
  authKey: null,
  mail: null,
  setMail: (mail) => set({ mail }),
  setAuthKey: (authKey) => set({ authKey }),
  reset: () => set({ authKey: null, mail: null }),
}));
