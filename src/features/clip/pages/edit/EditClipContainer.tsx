import EditClipForm from '../../ui/forms/EditClipForm';
import { useEditClipForm } from '../../model/hooks/useEditClipForm';

const EditClipContainer = () => {
  const {
    errors,
    handleBack,
    handleCategorySelect,
    handleOutsideClick,
    handleSubmit,
    handleVisibilitySelect,
    onSubmit,
    register,
    trigger,
    hiddenButtonRef,
  } = useEditClipForm();

  return (
    <EditClipForm
      errors={errors}
      handleBack={handleBack}
      handleCategorySelect={handleCategorySelect}
      handleOutsideClick={handleOutsideClick}
      hiddenButtonRef={hiddenButtonRef}
      onSubmit={handleSubmit(onSubmit)}
      trigger={trigger}
      register={register}
      handleVisibilitySelect={handleVisibilitySelect}
    />
  );
};
export default EditClipContainer;
