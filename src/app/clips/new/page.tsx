'use client';

import VisibilityDropdown from '@/components/dropdowns/VisibilityDropdown';
import CategoryDropdown from '@/components/dropdowns/CategoryDropdown';
import { useClipFilter } from '@/hooks/clip/useClipFilter';
import styled from 'styled-components';
import { Stack } from '@mui/material';
import { useNewClipForm } from '@/hooks/form/useNewClipForm';
import { useClipQuery } from '@/hooks/clip/clip/useClipQuery';

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
  const {
    clipList: { data },
  } = useClipQuery();
  const { categories } = useClipFilter(data);

  return (
    <Container>
      <TitleSection>
        <Divider />
        <Title>Create Clip </Title>
      </TitleSection>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VisibilityDropdown onSelect={handleVisibilitySelect} />
        <CategoryDropdown onSelect={handleCategorySelect} onCreator={handleCreateCreate} categories={categories} />
        <Input
          $error={!!errors.title}
          placeholder="Clip title"
          maxLength={30}
          {...register('title', {
            required: 'Enter Clip Title',
            maxLength: {
              value: 30,
              message: '',
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
            required: 'Enter Link',
          })}
          onBlur={() => trigger('link')}
        />
        <SubmitButton type="submit">Add to Clips</SubmitButton>
      </Form>
    </Container>
  );
}

const Container = styled(Stack)`
  background-color: ${(props) => props.theme.background.tertiary};
  padding: 1.5rem;
  width: 100%;
`;

const TitleSection = styled(Stack)`
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
`;

const Divider = styled(Stack)`
  width: 2.5rem;
  height: 0.25rem;
  background-color: #3f3f46;
  border-radius: 9999px;
  margin: 0 auto 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.text.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 24rem;
  margin: 0 auto;
  width: 100%;
`;

const Input = styled.input<{ $error: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.text.primary};

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border.focus};
  }
`;

const TextArea = styled.textarea<{ $error: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: ${(props) => props.theme.background.secondary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-radius: 0.5rem;
  color: ${(props) => props.theme.text.primary};
  min-height: 100px;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.border.focus};
  }
`;

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
`;
