'use client';

import { VisibilityDropdown } from '@/components/feature/dropdowns/VisibilityDropdown';
import { useCategoryQuery, useNewClipForm } from '@/hooks';
import classNames from 'classnames';
import { CategoryDropdown } from '@/components/feature/dropdowns/CategoryDropdown';

export default function ClipNewPage() {
  const {
    handleCategorySelect,
    handleSubmit,
    handleVisibilitySelect,
    handleCreateCategory,
    onSubmit,
    watch,
    register,
    trigger,
    errors,
  } = useNewClipForm();
  const {
    category: { categoryList, loading },
  } = useCategoryQuery();

  if (loading) return false;

  return (
    <div className="rounded-tl-[16px] rounded-tr-[16px] p-[1.5rem] w-full dark:bg-background-tertiary-dark">
      <div className="mb-[2rem] text-center w-full">
        <div className="w-[2.5rem] h-[0.25rem] bg-[#3f3f46] rounded-[9999px] mx-auto mt-0 mb-4" />
        <h1 className="text-[1.5rem] font-[500] dark:text-text-primary-dark">Create Clip</h1>
      </div>
      <form className="flex flex-col max-w-[24rem] m-auto w-full" onSubmit={handleSubmit(onSubmit)}>
        <VisibilityDropdown onSelect={handleVisibilitySelect} />
        {errors.visible ? (
          <span className="text-[#f44336] py-1 pl-2 text-xs select-none h-[20px]">{errors.visible?.message}</span>
        ) : watch('visible') ? (
          <span className="text-yellow-500 text-xs py-1 pl-2 select-none h-[20px]">Visibility cannot be edited.</span>
        ) : (
          <span className="py-1 pl-2 h-[20px]">&nbsp;</span>
        )}
        <CategoryDropdown
          onSelect={handleCategorySelect}
          onCreator={handleCreateCategory}
          categories={categoryList || []}
        />
        <span className="text-[#f44336] py-1 pl-2 text-xs select-none h-[20px]">{errors.category?.message || ' '}</span>
        <div>
          <input
            className={classNames(
              'w-full py-[12px] h-[50px] px-4 rounded-[0.5rem] border-solid border-[1px] dark:border-border-secondary-dark',
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
              onChange: (e) => {
                const value = e.target.value;
                if (value.length > 30) {
                  e.target.value = value.slice(0, 30);
                }
              },
            })}
          />
          <span
            className={classNames(
              'dark:text-text-placeholder-dark py-0 px-2 h-[20px]',
              'text-xs flex items-center justify-end'
            )}
          >
            {(watch('title') && watch('title').length) || 0}/30
          </span>
        </div>
        <textarea
          className={classNames(
            'w-full py-3 px-4 min-h-[150px] resize-none rounded-[0.5rem]',
            'border-solid border-[1px] dark:border-border-secondary-dark dark:text-text-primary-dark',
            'dark:bg-background-secondary-dark dark:placeholder-text-placeholder-dark',
            'focus:dark:border-border-focus-dark focus:outline-none'
          )}
          placeholder="https:// or http://"
          {...register('link', {
            required: 'Paste your link here',
            onChange: (e) => {
              if (e.target.value.length > 500) {
                e.target.value = e.target.value.slice(0, 500);
              }
              return true;
            },
          })}
          maxLength={500}
          onBlur={() => trigger('link')}
        />
        <div className="flex h-[20px] justify-between">
          <span className="w-[50px]"> </span>
          <span
            className={classNames(
              'dark:text-text-placeholder-dark order-2 w-[50px]',
              'text-xs text-center select-none px-2'
            )}
          >
            {(watch('link') && watch('link').length) || 0}/500
          </span>
          <span className="text-yellow-500 text-xs select-none order-1 flex items-center">
            {watch('visible') === 'public' ? 'Public clip cannot be edited.' : ' '}
          </span>
        </div>
        <button
          className={classNames(
            'w-full p-3 rounded-[0.5rem] font-medium transition-color duration-200 transform',
            'dark:bg-background-secondary-dark dark:text-text-primary-dark',
            'hover:dark:bg-border-secondary-dark active:scale-[0.97]'
          )}
          type="submit"
        >
          {watch('visible') === 'public'
            ? 'Create public clip'
            : watch('visible') === 'private'
            ? 'Create private clip'
            : 'Add a Clip'}
        </button>
      </form>
    </div>
  );
}
