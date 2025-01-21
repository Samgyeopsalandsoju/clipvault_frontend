import { Container, DragHandle, StyledInput, Textarea, Title, Wrapper } from '@/features/clip/pages/shared/styles';
import VisibilityDropdown from '../dropdowns/VisibilityDropdown';
import CategoryDropdown from '../dropdowns/CategoryDropdown';
import { SolidCustomButton } from '@/features/shared/ui/button';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Category, ClipType, VisibilityType } from '@/features/clip/model/clip.type';
import { FormEventHandler } from 'react';

interface ClipFormProps {
  register: UseFormRegister<ClipType>;
  errors: FieldErrors<ClipType>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  trigger: UseFormTrigger<ClipType>;
  handleCategorySelect: (category: Category) => void;
  handleVisibilitySelect: (visibility: VisibilityType) => void;
}

const NewClipForm = ({
  onSubmit,
  handleVisibilitySelect,
  handleCategorySelect,
  errors,
  register,
  trigger,
}: ClipFormProps) => {
  return (
    <Container>
      <DragHandle />
      <form onSubmit={onSubmit}>
        <Wrapper>
          <Title>Create Clip </Title>
          <VisibilityDropdown onSelect={handleVisibilitySelect} />
          <CategoryDropdown onSelect={handleCategorySelect} />
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
