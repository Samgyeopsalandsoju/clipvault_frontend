import { useAuthModalStore } from '@/stores/useAuthModalStore';
import { useAuthModeStore } from '@/stores/useAuthModeStore';

// 로그인 & 회원가입 모달 컨트롤
export const useAuthModal = () => {
  const { isOpen, setIsOpen } = useAuthModalStore();
  const { mode, setMode } = useAuthModeStore();

  return {
    isAuthModalOpen: isOpen,
    setIsAuthModalOpen: setIsOpen,
    setModalMode: setMode,
    modalMode: mode,
  };
};
