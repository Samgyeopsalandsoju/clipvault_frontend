'use client';

import { useNewClipForm } from '@/hooks/clip/useNewClipForm';
import NewClipForm from './NewClipForm';

export default function Page() {
  const {
    handleCategorySelect,
    handleSubmit,
    handleVisibilitySelect,
    handleCreateCreate,
    onSubmit,
    register,
    trigger,
    errors,
  } = useNewClipForm();
  return (
    <NewClipForm
      onSubmit={handleSubmit(onSubmit)}
      handleVisibilitySelect={handleVisibilitySelect}
      handleCategorySelect={handleCategorySelect}
      handleCreateCreate={handleCreateCreate}
      errors={errors}
      register={register}
      trigger={trigger}
    />
  );
}
