'use client';
import { clipPopupTypeAtom } from '@/atoms/clip.atom';
import { useDetailClipForm } from '@/hooks/clip/useDetailClipForm';
import { useEditClipForm } from '@/hooks/clip/useEditClipForm';
import { useAtomValue } from 'jotai';
import { useClip } from '@/hooks/clip/clip/useClip';
import { useParams } from 'next/navigation';
import DetailClipForm from '../DetailClipForm';
import EditClipForm from '../EditClipForm';

export default function Page() {
  const { handleBack, handleEdit } = useDetailClipForm();
  const clipPopupType = useAtomValue(clipPopupTypeAtom);
  const { clipId } = useParams();
  const {
    clip: { data },
  } = useClip(clipId);
  const {
    errors,
    handleBack: editBack,
    handleCategorySelect,
    handleOutsideClick,
    handleSubmit,
    handleVisibilitySelect,
    setValue,
    onSubmit,
    register,
    trigger,
    hiddenButtonRef,
  } = useEditClipForm();

  return (
    <>
      {clipPopupType === 'detail' ? (
        <DetailClipForm handleBack={handleBack} handleEdit={handleEdit} clipInfo={data} />
      ) : (
        <EditClipForm
          errors={errors}
          handleBack={editBack}
          handleCategorySelect={handleCategorySelect}
          handleOutsideClick={handleOutsideClick}
          hiddenButtonRef={hiddenButtonRef}
          onSubmit={handleSubmit(onSubmit)}
          trigger={trigger}
          register={register}
          handleVisibilitySelect={handleVisibilitySelect}
          clipInfo={data}
          setValue={setValue}
        />
      )}
    </>
  );
}
