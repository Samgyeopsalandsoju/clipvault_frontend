'use client';
import { useNewClipForm } from '../../model/hooks/useNewClipForm';
import NewClipForm from '../../ui/forms/NewClipForm';

const NewClipContainer = () => {
  const { handleCategorySelect, handleSubmit, handleVisibilitySelect, onSubmit, register, trigger, errors } =
    useNewClipForm();
  return (
    <NewClipForm
      onSubmit={handleSubmit(onSubmit)}
      handleVisibilitySelect={handleVisibilitySelect}
      handleCategorySelect={handleCategorySelect}
      errors={errors}
      register={register}
      trigger={trigger}
    />
  );
};
export default NewClipContainer;
