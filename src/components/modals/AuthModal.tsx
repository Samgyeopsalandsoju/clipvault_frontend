'use client';

import { useAuthModal } from '@/hooks';
import { LoginForm } from '../form/LoginForm';
import { RegisterForm } from '../form/RegisterForm';
import classNames from 'classnames';

export const AuthModal = () => {
  const { isAuthModalOpen, modalMode, setIsAuthModalOpen } = useAuthModal();

  if (!isAuthModalOpen) return;

  return (
    <div
      className={classNames('fixed inset-0 bg-black bg-opacity-50', 'flex items-center justify-center z-[99]')}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsAuthModalOpen(false);
        }
      }}
    >
      <div className="dark:bg-background-primary-dark rounded-[16px] p-5 m-4 border-[1px] dark:border-border-divider-dark w-[400px]">
        <div className="p-6 overflow-y-auto max-h-[80vh] flex-1">
          {modalMode === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};
