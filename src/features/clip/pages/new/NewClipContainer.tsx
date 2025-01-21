import NewClipForm from '../../ui/forms/NewClipForm';
import useNewClipForm from '../../model/hooks/useNewClipForm';

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
