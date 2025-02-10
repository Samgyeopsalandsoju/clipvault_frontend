import { createToast } from '@/libs/hot-toast';
import { useTheme } from 'styled-components';

export const useToast = () => {
  const theme = useTheme();
  const { success, error } = createToast();

  return {
    successToast: success,
    errorToast: error,
  };
};
