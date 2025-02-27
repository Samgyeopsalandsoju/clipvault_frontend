import { create } from 'zustand';

export const authRef = { isAuthenticated: false };

interface ISessionStoreProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useSessionStore = create<ISessionStoreProps>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => {
    // 스토어 상태 업데이트 (일반적인 구독 컴포넌트용)
    set({ isAuthenticated });

    // 참조 객체도 업데이트 (참조를 통해 접근하는 컴포넌트용)
    authRef.isAuthenticated = isAuthenticated;
  },
}));
