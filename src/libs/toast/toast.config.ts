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
      },
      icon: '❌',
      duration: 3000,
    });
  },
});
