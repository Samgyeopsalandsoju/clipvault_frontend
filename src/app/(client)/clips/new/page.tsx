'use client';

import styled from 'styled-components';
import { Container, Divider, Form, Input, TextArea, Title, TitleSection } from '../clips.styles';
import { useClipFilter, useClipQuery, useNewClipForm } from '@/hooks';
import { CategoryDropdown, VisibilityDropdown } from '@/components';

export default function Page() {
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
    clips: { clipList },
  } = useClipQuery();
  const { categories } = useClipFilter(clipList);

  return (
    <Container>
      <TitleSection>
        <Divider />
        <Title>Create Clip</Title>
      </TitleSection>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VisibilityDropdown onSelect={handleVisibilitySelect} />
        <CategoryDropdown onSelect={handleCategorySelect} onCreator={handleCreateCategory} categories={categories} />
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
        <SubmitButton type="submit">Add to Clips</SubmitButton>
      </Form>
    </Container>
  );
}

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.background.secondary};
  color: ${(props) => props.theme.text.primary};
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.border.secondary};
  }
  &:active {
    scale: 0.97;
  }
`;
