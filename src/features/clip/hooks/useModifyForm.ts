import { useForm } from 'react-hook-form';
import { IModifyForm } from '../model/types';

export const useModifyForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm<IModifyForm>();

  return { register, setValue, handleSubmit, reset };
};
