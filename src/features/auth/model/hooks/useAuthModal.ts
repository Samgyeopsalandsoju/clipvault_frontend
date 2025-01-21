import { useAtom, useAtomValue } from 'jotai';
import { authModalAtom, authModeAtom } from '../auth.atom';

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useAtom(authModalAtom);
  const mode = useAtomValue(authModeAtom);

  return {
    isOpen,
    setIsOpen,
    mode,
  };
};
