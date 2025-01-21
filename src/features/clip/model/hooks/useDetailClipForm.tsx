import { useSetAtom } from 'jotai';
import { ClipPageOpenAtom } from '../clip.atom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useDetailClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const router = useRouter();
  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  const handleBack = () => {
    setIsOpen(false);
    router.back();
  };

  const handleEdit = () => {
    setIsOpen(false);
    router.push('/clip/edit');
  };

  return { handleBack, handleEdit };
};
