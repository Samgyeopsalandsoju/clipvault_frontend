'use client';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ClipPageOpenAtom, clipPopupTypeAtom } from '../../atoms/clip.atom';

export const useDetailClipForm = () => {
  const setIsOpen = useSetAtom(ClipPageOpenAtom);
  const setClipTypePopup = useSetAtom(clipPopupTypeAtom);
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
    setClipTypePopup('edit');
  };

  const handleClipClick = (id: string) => {
    router.push(`/clips/detail/${id}`);
  };

  return { handleBack, handleEdit, handleClipClick };
};
