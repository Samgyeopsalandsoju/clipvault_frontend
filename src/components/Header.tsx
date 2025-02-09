'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { authModalAtom, authModeAtom } from '@/atoms/auth.atom';
import { FormType } from '@/types/auth';
import ClipVaultInfo from './ClipVaultInfo';
import classNames from 'classnames';

const HeaderComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <button
        className="p-2 rounded-full bg-transparent hover:bg-gray-800 active:bg-gray-700 focus:outline-none dark:text-text-primary-dark"
        onClick={toggleDrawer}
      >
        <Menu />
      </button>
      <Navigation isOpen={drawerOpen} onClose={handleClose} />
    </>
  );
};
export default HeaderComponent;

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavBarProps) => {
  const setMode = useSetAtom(authModeAtom);
  const setIsAuthModalOpen = useSetAtom(authModalAtom);
  const isToken = false;

  const handleOpenModal = (type: FormType) => {
    onClose();
    setIsAuthModalOpen(true);
    setMode(type);
  };

  return (
    <>
      <div
        className={classNames(
          'absolute top-[57px] left-0 right-0 bottom-0 bg-[rgba(49,49,49,0.607)] z-[998] h-full',
          'transition-opacity duration-300 ease-in-out',
          {
            'opacity-100 visible': isOpen,
            'opacity-0 invisible': !isOpen,
          }
        )}
        onClick={onClose}
      />
      <nav
        className={classNames(
          'flex justify-between flex-col p-[25px] absolute top-[57px] w-[80%]',
          'transition-all duration-300 ease-in-out shadow-[0_0_5px_rgba(0,_0,_0,_0.1)] z-[999]',
          'dark:bg-background-primary-dark',
          {
            'right-0': isOpen,
            'right-[-100%]': !isOpen,
          }
        )}
        style={{
          height: 'calc(100vh - 60px)',
        }}
      >
        {!isToken && (
          <div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
              onClick={() => handleOpenModal('register')}
            >
              Sign up
            </div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
              onClick={() => handleOpenModal('login')}
            >
              Login
            </div>
          </div>
        )}
        {isToken && (
          <div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
            >
              <Link href={'/mypage'}>My page</Link>
            </div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none text-[#f44336]'
              )}
            >
              Logout
            </div>
          </div>
        )}

        <ClipVaultInfo />
      </nav>
    </>
  );
};
