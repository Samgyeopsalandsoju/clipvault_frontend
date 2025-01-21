import {
  BorderLessButton,
  Container,
  DragHandle,
  DragHandleSection,
  StyledInput,
  Textarea,
  Title,
  Wrapper,
} from '@/features/clip/pages/shared/styles';
import VisibilityDropdown from '../dropdowns/VisibilityDropdown';
import CategoryDropdown from '../dropdowns/CategoryDropdown';
import { FieldErrors, UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { Category, ClipType, VisibilityType } from '@/features/clip/model/clip.type';
import { FormEventHandler, RefObject } from 'react';

interface EditClipFormProps {
  handleBack: () => void;
  handleOutsideClick: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  handleVisibilitySelect: (visibility: VisibilityType) => void;
  handleCategorySelect: (category: Category) => void;
  errors: FieldErrors<ClipType>;
  register: UseFormRegister<ClipType>;
  trigger: UseFormTrigger<ClipType>;
  hiddenButtonRef: RefObject<HTMLButtonElement | null>;
}

const EditClipForm = ({
  handleBack,
  handleOutsideClick,
  onSubmit,
  handleVisibilitySelect,
  handleCategorySelect,
  errors,
  register,
  trigger,
  hiddenButtonRef,
}: EditClipFormProps) => {
  return (
    <Container>
      <DragHandleSection>
        <BorderLessButton onClick={handleBack} disableRipple>
          back
        </BorderLessButton>
        <DragHandle />
        <BorderLessButton onClick={handleOutsideClick} $color="#007AFF" disableRipple>
          Edit
        </BorderLessButton>
      </DragHandleSection>
      <form onSubmit={onSubmit}>
        <Wrapper>
          <Title>Edit Clip</Title>
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
          <BorderLessButton $color={'#f44336'} disableRipple>
            삭제
          </BorderLessButton>
          <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
        </Wrapper>
      </form>
    </Container>
  );
};
export default EditClipForm;
