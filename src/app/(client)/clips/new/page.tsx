'use client';

import { Container, Divider, Form, Input, TextArea, Title, TitleSection } from '../clips.styles';
import { useCategoryQuery, useNewClipForm } from '@/hooks';
import { CategoryDropdown, VisibilityDropdown } from '@/components';
import classNames from 'classnames';

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
        <div>
          <VisibilityDropdown onSelect={handleVisibilitySelect} />
          <span className="text-[#f44336] py-1 pl-2 text-xs">{errors.visible?.message || ' '}</span>
        </div>
        <div>
          <CategoryDropdown
            onSelect={handleCategorySelect}
            onCreator={handleCreateCategory}
            categories={categoryList}
          />
          <span className="text-[#f44336] py-1 pl-2 text-xs">{errors.category?.message || ' '}</span>
        </div>
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
          <span className={classNames('dark:text-text-placeholder-dark py-1 px-2 ', 'text-xs flex justify-end')}>
            {(watch('title') && watch('title').length) || 0}/30
          </span>
        </div>
        <div>
          <TextArea
            $error={!!errors.link}
            placeholder="Link"
            {...register('link', {
              required: 'Paste your link here',
            })}
            onBlur={() => trigger('link')}
          />
          <span className={classNames('dark:text-text-placeholder-dark pt-0 pb-1 px-2 ', 'text-xs flex justify-end')}>
            {(watch('link') && watch('link').length) || 0}/200
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
          Add to Clips
        </button>
      </Form>
    </Container>
  );
}
