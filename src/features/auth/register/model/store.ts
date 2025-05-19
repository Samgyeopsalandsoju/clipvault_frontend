import { create } from 'zustand';
import { IRegisterStore, IVerifiedCodeStore } from './type';

// 회원가입 스토어
export const useRegisterStore = create<IRegisterStore>((set) => ({
  verifiedMail: null,
  setVerifiedMail: (verifiedMail) => set({ verifiedMail }),
}));

// 인증 번호 스토어
export const useVerifyCodeStore = create<IVerifiedCodeStore>((set) => ({
  // 인증 상태
  isVerified: false,
  setIsVerified: (isVerified: boolean) => set({ isVerified }),

  // 인증 과정 정보
  mail: null,
  authKey: null,
  setMail: (mail) => set({ mail }),
  setAuthKey: (authKey) => set({ authKey }),

  reset: () => set({ authKey: null, mail: null }),
}));
