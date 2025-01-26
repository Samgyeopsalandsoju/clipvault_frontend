'use client';

import toast from 'react-hot-toast';
import { DefaultTheme } from 'styled-components';

export const createToastService = (theme: DefaultTheme) => ({
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: theme.text.primary,
        color: theme.background.primary,
        borderRadius: '10px',
      },
      icon: '🙆‍♀️',
      duration: 3000,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        background: theme.text.primary,
        color: theme.background.primary,
        borderRadius: '10px',
      },
      icon: '❌',
      duration: 3000,
    });
  },
});
