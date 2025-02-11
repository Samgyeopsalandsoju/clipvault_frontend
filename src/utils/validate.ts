import { createToast } from '@/libs';
import { ICategoryResponse, ICreateClip } from '@/types';

// create clip validator
export const createClipValidator = () => {
  const toastService = createToast();
  const validateString = (field: string, message: string) => {
    if (!field || field.length === 0) {
      toastService.error(message);
      return false;
    }
    return true;
  };

  const validateCategory = (field: ICategoryResponse, message: string) => {
    if (!field || Object.keys(field).length <= 0) {
      toastService.error(message);
      return false;
    }
    return true;
  };

  return {
    validateForm: (data: ICreateClip) => {
      const isVisibilityValid = validateString(data.visible, "Please, set your clip's visibility");
      if (!isVisibilityValid) return false;

      const isCategoryValid = validateCategory(data.category, "Please set your clip's category");
      if (!isCategoryValid) return false;

      return true;
    },
  };
};
