import { useForm } from 'react-hook-form';
import { IClipForm } from '../model/type';

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
