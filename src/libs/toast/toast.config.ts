import toast from 'react-hot-toast';

export const createToast = () => ({
  success: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '12px',
        backgroundColor: '#E8F5E9',
        color: '#388E3C',
        border: '1px solid #388E3C',
      },
      icon: '🙆‍♀️',
      duration: 3000,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        borderRadius: '12px',
        backgroundColor: '#FFEBEE',
        color: '#D32F2F',
        border: '1px solid #D32F2F',
        zIndex: 999999,
      },
      icon: '🙅‍♀️',
      duration: 3000,
    });
  },

  info: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '12px',
        backgroundColor: '#E3F2FD',
        color: '#1976D2',
        border: '1px solid #1976D2',
        zIndex: 999999,
      },
      icon: 'ℹ️',
      duration: 3000,
    });
  },
  promise: <T>(promise: Promise<T>, messages: { loading: string; success: string; error: string }) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        style: {
          borderRadius: '12px',
          backgroundColor: '#E3F2FD',
          color: '#1976D2',
          border: '1px solid #1976D2',
          zIndex: 9999,
        },
        duration: 3000,
      }
    );
  },
});
