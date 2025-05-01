import { useForm } from 'react-hook-form';
import { ICreateForm } from '../model/type';

export const useCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ICreateForm>();

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
  };
};
