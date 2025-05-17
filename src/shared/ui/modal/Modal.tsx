'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, isOpen, onClose }: { children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  // 모달 마운트 시 모달 상태 업데이트
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // 모달 열림 시 브라우저 스크롤 방지
  // useEffect(() => {
  //   const documentElement = document.documentElement;
  //   if (isOpen) {
  //     documentElement.classList.add('overflow-hidden');
  //   } else {
  //     documentElement.classList.remove('overflow-hidden');
  //   }
  //   return () => {
  //     documentElement.classList.remove('overflow-hidden');
  //   };
  // }, [isOpen]);

  // 모달이 열리지 않거나 마운트되지 않았으면 null 반환
  if (!isOpen || !mounted) return null;

  // 모달 렌더링
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body!
  );
}

export { Modal };
