'use client';
import { useEditClipForm } from '@/hooks/clip/useEditClipForm';
import { useClip } from '@/hooks/clip/clip/useClip';
import { useParams } from 'next/navigation';
import {
  BorderLessButton,
  Container,
  DragHandle,
  DragHandleSection,
  StyledInput,
  Textarea,
  Title,
  Wrapper,
} from '../../components/styles';
import VisibilityDropdown from '@/components/dropdowns/VisibilityDropdown';
import { VisibilityType } from '@/types/clip';
import { useClipManagement } from '@/hooks/clip/useClipManagement';
import ModifyDropdown from '@/components/dropdowns/ModifyDropdown';

export default function Page() {
  const { clipId } = useParams();
  const {
    clip: { data },
  } = useClip(clipId);
  const {
    errors,
    handleBack,
    handleCategorySelect,
    handleOutsideClick,
    handleSubmit,
    handleVisibilitySelect,
    setValue,
    onSubmit,
    register,
    trigger,
    onDelete,
    hiddenButtonRef,
  } = useEditClipForm();
  const { categories } = useClipManagement();

  if (!data) return;
  const { visible, category, link, title, id } = data;

  return (
    <Container>
      <DragHandleSection>
        <BorderLessButton onClick={handleBack} disableRipple>
          back
        </BorderLessButton>
        <DragHandle />
        <BorderLessButton onClick={handleOutsideClick} $color="#007AFF" disableRipple>
          Save
        </BorderLessButton>
      </DragHandleSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Title>Edit Clip</Title>
          <VisibilityDropdown onSelect={handleVisibilitySelect} visible={visible as VisibilityType} />
          <ModifyDropdown onSelect={handleCategorySelect} categories={categories} category={category} />
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
          <BorderLessButton onClick={() => onDelete(id)} $color={'#f44336'} disableRipple>
            삭제
          </BorderLessButton>
          <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
        </Wrapper>
      </form>
    </Container>
  );
}
