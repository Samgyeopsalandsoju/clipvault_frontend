'use client';

import { VisibilityDropdown } from '@/components/feature/dropdowns/VisibilityDropdown';
import { Container, Divider, Form, Input, TextArea, Title, TitleSection } from '../clips.styles';
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
    <Container>
      <TitleSection>
        <Divider />
        <Title>Create Clip</Title>
      </TitleSection>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            $error={!!errors.title}
            placeholder="Clip title"
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
        <TextArea
          $error={!!errors.link}
          placeholder="https:// or http://"
          {...register('link', {
            required: 'Paste your link here',
          })}
          onBlur={() => trigger('link')}
        />
        <span
          className={classNames(
            'dark:text-text-placeholder-dark pt-0 px-2 h-[20px]',
            'text-xs flex items-center justify-end'
          )}
        >
          {(watch('link') && watch('link').length) || 0}/200
        </span>
        <span className="text-yellow-500 text-sm text-center select-none h-[20px]">
          {watch('visible') === 'public' ? 'Public clip cannot be edited.' : ' '}
        </span>
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
      </Form>
    </Container>
  );
}
