import toast from 'react-hot-toast';

export const createToast = () => ({
  success: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '10px',
      },
      icon: '🙆‍♀️',
      duration: 3000,
      className: 'dark:text-text-primary-dark dark:bg-background-primary-dark',
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        borderRadius: '10px',
      },
      icon: '❌',
      duration: 3000,
      className: 'dark:text-text-primary-dark dark:bg-background-primary-dark',
    });
  },
});
