import { createToastService } from '@/libs/hot-toast';
import { useTheme } from 'styled-components';

export const useToast = () => {
  const theme = useTheme();
  const { success, error } = createToastService(theme);

  return {
    successToast: success,
    errorToast: error,
  };
};
