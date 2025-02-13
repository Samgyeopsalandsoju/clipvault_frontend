'use client';

import { Slide } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import ClipPage from './page';
import classNames from 'classnames';
import { useClipPageTransition } from '@/hooks';
import { ClipPageOpenAtom } from '@/atoms';
import { CreateClipButton } from '@/components';
import { isModalPath } from '@/utils';

export default function ClipLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const isOpen = useAtomValue(ClipPageOpenAtom);
  const { handleClose } = useClipPageTransition();
  useEffect(() => {
    setMounted(true);
  }, []);
  // MODAL_PATH에 설정된 path는 페이지가 아래에서 올라오게 한다
  const pathname = usePathname();
  const shouldShowModal = isModalPath(pathname);
  return (
    <div className="flex flex-col flex-1 relative w-full h-full overflow-x-hidden">
      <div className="relative w-full flex flex-col flex-1 h-full">
        <ClipPage />
        {!shouldShowModal ? <CreateClipButton /> : ''}
      </div>

      {shouldShowModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 pointer-events-none">
          <div
            className={classNames(
              'absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 pointer-events-auto',
              'transition-opacity duration-300',
              {
                'opacity-100': isOpen,
                'opacity-0': !isOpen,
              }
            )}
            onClick={handleClose}
          />
          <Slide direction="up" in={isOpen && mounted}>
            <div
              className={classNames(
                'max-w-[480px] m-auto absolute bottom-0 left-0 right-0 h-[60vh] pointer-events-auto',
                'z-1000 rounded-tl-[16px] rounded-tr-[16px] isolate transform translate-z-0 lg:h-[65vh]',
                'dark:bg-background-primary-dark dark:border-border-primary-dark z-9999'
              )}
            >
              {children}
            </div>
          </Slide>
        </div>
      )}
    </div>
  );
}
