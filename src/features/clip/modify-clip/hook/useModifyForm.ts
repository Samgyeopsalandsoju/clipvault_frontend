import { useForm } from 'react-hook-form';
import { ModifyFormProps } from '../model/type';

export const useModifyForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm<ModifyFormProps>();

  return { register, setValue, handleSubmit, reset };
};
