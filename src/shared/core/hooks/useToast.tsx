import { ToastContext } from '@/app/_providers/ToastProvider';
import { useContext } from 'react';

// 토스트 훅
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
