import { SolidCustomButton } from '@/components/button';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { FormEventHandler } from 'react';
import { Container, DragHandle, StyledInput, Textarea, Wrapper } from '@/app/(client)/clips/styles';
import { Title } from '@/components/forms/styles';
import VisibilityDropdown from '@/components/dropdowns/VisibilityDropdown';
import CategoryDropdown from '@/components/dropdowns/CategoryDropdown';
import { ICategory, ICategoryResponse, ICreateClip, VisibilityType } from '@/types/clip';
import { useClipManagement } from '@/hooks/clip/useClipManagement';

interface ClipFormProps {
  register: UseFormRegister<ICreateClip>;
  errors: FieldErrors<ICreateClip>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  trigger: UseFormTrigger<ICreateClip>;
  handleCategorySelect: (category: ICategoryResponse) => void;
  handleVisibilitySelect: (visibility: VisibilityType) => void;
  handleCreateCreate: (category: ICategoryResponse) => void;
}

const NewClipForm = ({
  onSubmit,
  handleVisibilitySelect,
  handleCategorySelect,
  handleCreateCreate,
  errors,
  register,
  trigger,
}: ClipFormProps) => {
  const { categories } = useClipManagement();

  return (
    <Container>
      <DragHandle />
      <form onSubmit={onSubmit}>
        <Wrapper>
          <Title>Create Clip </Title>
          <VisibilityDropdown onSelect={handleVisibilitySelect} />
          <CategoryDropdown onSelect={handleCategorySelect} onCreator={handleCreateCreate} categories={categories} />
          <StyledInput
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
          <Textarea
            $error={!!errors.link}
            placeholder="link를 복사 붙여넣기 해주세요!"
            {...register('link', {
              required: '저장할 링크를 복사 붙여넣기 해주세요!',
            })}
            onBlur={() => trigger('title')}
          />
          <SolidCustomButton type="submit" sx={{ width: '300px' }}>
            클립 만들기!
          </SolidCustomButton>
        </Wrapper>
      </form>
    </Container>
  );
};

export default NewClipForm;
