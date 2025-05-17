import { useForm } from 'react-hook-form';
import { IClipForm } from '../model/types';

export const useCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IClipForm>();

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
  };
};
