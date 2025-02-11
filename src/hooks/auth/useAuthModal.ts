import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { authModalAtom, authModeAtom } from '../../atoms/auth.atom';

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useAtom(authModalAtom);
  const setMode = useSetAtom(authModeAtom);
  const mode = useAtomValue(authModeAtom);

  return {
    isOpen,
    setIsOpen,
    setMode,
    mode,
  };
};
