import { authModalAtom, authModeAtom } from '@/atoms';
import { useAtom } from 'jotai';

// 로그인 & 회원가입 모달 컨트롤
export const useAuthModal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useAtom(authModalAtom);
  const [modalMode, setModalMode] = useAtom(authModeAtom);

  return {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setModalMode,
    modalMode,
  };
};
