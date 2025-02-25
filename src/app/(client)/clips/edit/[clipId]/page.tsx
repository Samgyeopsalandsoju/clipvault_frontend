'use client';

import { useParams } from 'next/navigation';
import { useCategoryQuery, useClipQuery, useEditClipForm } from '@/hooks';
import { VisibilityType } from '@/types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { SkeletonUI } from '@/components/skeleton/SkeletonUI';
import { VisibilityDropdown } from '@/components/feature/dropdowns/VisibilityDropdown';
import { ModifyDropdown } from '@/components/feature/dropdowns/ModifyDropdown';
import { generateModernTagColors } from '@/utils';

export default function Page() {
  const {
    handleClose,
    handleCategorySelect,
    handleOutsideClick,
    handleSubmit,
    handleVisibilitySelect,
    onSubmit,
    register,
    trigger,
    onDelete,
    reset,
    hiddenButtonRef,
  } = useEditClipForm();
  const { clipId } = useParams();
  const {
    clip: { clip, isClipLoading },
  } = useClipQuery(clipId);

  const {
    category: { categoryList, loading },
  } = useCategoryQuery();

  useEffect(() => {
    if (clip) {
      reset(clip);
    }
  }, [clip]);

  if (!clip) return;
  const { visible, category, id } = clip;
  const isPublic = clip?.visible === 'public';
  if (loading || isClipLoading) false;

  const { background, text } = generateModernTagColors(Number(category.color));

  return (
    <div className="rounded-tl-[16px] rounded-tr-[16px] p-[1.5rem] w-full dark:bg-background-tertiary-dark">
      <div className="mb-[2rem] text-center w-full">
        <div className="flex justify-between w-full">
          <button className="text-[15px] dark:text-text-primary-dark font-semibold" onClick={handleClose}>
            back
          </button>
          <div>
            <div className="w-[2.5rem] h-[0.25rem] bg-[#3f3f46] rounded-[9999px] mx-auto mt-0 mb-4" />
            <h1 className="text-[1.5rem] dark:text-text-primary-dark">Edit Clip</h1>
          </div>
          <button
            className="text-[15px] text-[#007AFF] font-semibold"
            onClick={isPublic ? undefined : handleOutsideClick}
            disabled={isPublic}
          >
            Save
          </button>
        </div>
      </div>
      <form className="flex flex-col max-w-[24rem] m-auto w-full" onSubmit={handleSubmit(onSubmit)}>
        {loading || isClipLoading ? (
          <>
            <SkeletonUI.Edit />
          </>
        ) : (
          <>
            <div>
              <div
                className={classNames(
                  'w-full px-4 py-3 rounded-[0.5rem] border-solid border-[1px] focus:outline-none focus:dark:border-border-focus-dark',
                  'dark:placeholder-text-placeholder-dark dark:border-border-secondary-dark dark:bg-background-primary-dark',
                  'dark:text-text-primary-dark'
                )}
              >
                {visible}
              </div>
              <span className="text-yellow-500 text-sm py-1 pl-2 select-none">Visibility cannot be edited.</span>
            </div>
            {isPublic ? (
              <>
                <div
                  className={classNames(
                    'w-full px-4 py-3 rounded-[0.5rem] border-solid border-[1px] focus:outline-none focus:dark:border-border-focus-dark',
                    'dark:placeholder-text-placeholder-dark dark:border-border-secondary-dark dark:bg-background-secondary-dark',
                    'dark:text-text-primary-dark mb-[20px]'
                  )}
                  style={{
                    backgroundColor: background,
                    color: text,
                  }}
                >
                  {category.name}
                </div>
              </>
            ) : (
              <>
                <div className="mb-[20px]">
                  <ModifyDropdown onSelect={handleCategorySelect} categories={categoryList || []} category={category} />
                </div>
              </>
            )}

            <input
              className={classNames(
                'w-full py-3 px-4 rounded-[0.5rem] border-solid border-[1px] dark:border-border-secondary-dark',
                'dark:bg-background-secondary-dark dark:text-text-primary-dark dark:placeholder-text-placeholder-dark',
                'focus:outline-none focus:dark:border-border-focus-dark mb-[20px]'
              )}
              placeholder="Clip Title"
              maxLength={30}
              {...register('title', {
                required: 'Type your title here',
                maxLength: {
                  value: 30,
                  message: 'Limited to 30 characters',
                },
              })}
              disabled={isPublic}
            />
            <textarea
              className={classNames(
                'w-full py-3 px-4 min-h-[150px] resize-none rounded-[0.5rem]',
                'border-solid border-[1px] dark:border-border-secondary-dark dark:text-text-primary-dark',
                'dark:bg-background-secondary-dark dark:placeholder-text-placeholder-dark',
                'focus:dark:border-border-focus-dark focus:outline-none mb-[20px]'
              )}
              placeholder="Link"
              {...register('link', {
                required: 'Paste your link here',
              })}
              onBlur={() => trigger('title')}
              disabled={isPublic}
            />
          </>
        )}

        <button type="button" className="text-[15px] text-[#f44336] font-semibold" onClick={() => onDelete(id)}>
          Delete Clip
        </button>
        <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
}
