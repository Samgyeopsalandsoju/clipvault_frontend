'use client';

import { useNewClipForm } from '@/hooks/clip/useNewClipForm';
import VisibilityDropdown from '@/components/dropdowns/VisibilityDropdown';
import CategoryDropdown from '@/components/dropdowns/CategoryDropdown';
import { useClipManagement } from '@/hooks/clip/useClipManagement';
import styled from 'styled-components';
import { Stack } from '@mui/material';

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
  const { categories } = useClipManagement();

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
          placeholder="클립 이름을 지어주세요!"
          maxLength={30}
          {...register('title', {
            required: '클립 이름을 작성해주세요!',
            maxLength: {
              value: 30,
              message: '30글자 이상 작성할 수 없어요!',
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
          placeholder="link를 복사 붙여넣기 해주세요!"
          {...register('link', {
            required: '저장할 링크를 복사 붙여넣기 해주세요!',
          })}
          onBlur={() => trigger('title')}
        />
        <SubmitButton type="submit">클립 만들기!</SubmitButton>
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
