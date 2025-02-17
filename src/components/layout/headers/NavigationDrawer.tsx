'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import { ApplicationInfo } from '@/components';
import { FormType } from '@/types';
import { useAuthModalStore, useAuthModeStore } from '@/stores';

export const NavigationDrawer = () => {
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

interface NavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ isOpen, onClose }: NavBarProps) => {
  const { setMode } = useAuthModeStore();
  const { setIsOpen } = useAuthModalStore();
  const { data: _, status } = useSession();

  const handleOpenModal = (type: FormType) => {
    onClose();
    setIsOpen(true);
    setMode(type);
  };

  return (
    <>
      <div
        className={classNames(
          'absolute top-[57px] left-0 right-0 bottom-0 bg-[rgba(49,49,49,0.607)] z-[1] h-full',
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
          'transition-all duration-300 ease-in-out shadow-[0_0_5px_rgba(0,_0,_0,_0.1)] z-[10]',
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
        {status === 'unauthenticated' && (
          <div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
              onClick={() => handleOpenModal('login')}
            >
              Login
            </div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
              onClick={() => handleOpenModal('register')}
            >
              Sign up
            </div>
          </div>
        )}
        {status === 'authenticated' && (
          <div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none',
                'dark:text-text-primary-dark'
              )}
            >
              <Link href={'/mypage'} onClick={onClose}>
                My page
              </Link>
            </div>
            <div
              className={classNames(
                'py-[16px] px-[25px] border-b dark:border-border-divider-dark text-[24px] font-semibold cursor-pointer select-none text-[#f44336]'
              )}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </div>
          </div>
        )}

        <ApplicationInfo />
      </nav>
    </>
  );
};
