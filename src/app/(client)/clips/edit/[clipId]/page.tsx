'use client';

import { useParams } from 'next/navigation';
import { useClipFilter, useClipQuery, useEditClipForm } from '@/hooks';
import { VisibilityType } from '@/types';
import { ModifyDropdown, VisibilityDropdown } from '@/components';
import classNames from 'classnames';
import { useEffect } from 'react';

export default function Page() {
  const { clipId } = useParams();
  const {
    clip: { data },
    clips: { clipList },
  } = useClipQuery(clipId);

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
  const { categories } = useClipFilter(clipList);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  if (!data) return;
  const { visible, category, id } = data;

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
          <button className="text-[15px] text-[#007AFF] font-semibold" onClick={handleOutsideClick}>
            Save
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-[1rem] max-w-[24rem] m-auto w-full]" onSubmit={handleSubmit(onSubmit)}>
        <VisibilityDropdown onSelect={handleVisibilitySelect} visible={visible as VisibilityType} />
        <ModifyDropdown onSelect={handleCategorySelect} categories={categories} category={category} />
        <input
          className={classNames(
            'w-full py-3 px-4 rounded-[0.5rem] border-solid border-[1px] dark:border-border-secondary-dark',
            'dark:bg-background-secondary-dark dark:text-text-primary-dark dark:placeholder-text-placeholder-dark',
            'focus:outline-none focus:dark:border-border-focus-dark'
          )}
          placeholder="Clip Title"
          maxLength={30}
          {...register('title', {
            required: 'Type your title here',
            maxLength: {
              value: 30,
              message: 'Limited to 30 characters',
            },
            // onChange: (e) => {
            //   const value = e.target.value;
            //   if (value.length > 30) {
            //     e.target.value = value.slice(0, 30);
            //   }
            // },
          })}
        />
        <textarea
          className={classNames(
            'w-full py-3 px-4 min-h-[100px] resize-none rounded-[0.5rem]',
            'border-solid border-[1px] dark:border-border-secondary-dark dark:text-text-primary-dark',
            'dark:bg-background-secondary-dark dark:placeholder-text-placeholder-dark',
            'focus:dark:border-border-focus-dark focus:outline-none'
          )}
          placeholder="Link"
          {...register('link', {
            required: 'Paste your link here',
          })}
          onBlur={() => trigger('title')}
        />
        <button className="text-[15px] text-[#f44336] font-semibold" onClick={() => onDelete(id)}>
          Delete Clip
        </button>
        <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  );
}
