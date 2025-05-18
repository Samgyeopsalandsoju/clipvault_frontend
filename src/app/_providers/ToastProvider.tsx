'use client';
import React, { createContext, ReactNode } from 'react';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  dismiss: (toastId?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-center',
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // 성공
  const success = (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      ...options,
    });
  };

  // 에러
  const error = (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      ...options,
      duration: options?.duration || 4000, // 에러는 조금 더 길게 보여줌
    });
  };

  // 로딩
  const loading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  };

  // 토스트 제거
  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  const contextValue: ToastContextType = {
    success,
    error,
    loading,
    dismiss,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </ToastContext.Provider>
  );
};
