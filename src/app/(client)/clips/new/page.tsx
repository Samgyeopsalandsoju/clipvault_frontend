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
        <CategoryDropdown onSelect={handleCategorySelect} onCreator={handleCreateCategory} categories={categoryList} />
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
        <TextArea
          $error={!!errors.link}
          placeholder="Link"
          {...register('link', {
            required: 'Paste your link here',
          })}
          onBlur={() => trigger('link')}
        />
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
