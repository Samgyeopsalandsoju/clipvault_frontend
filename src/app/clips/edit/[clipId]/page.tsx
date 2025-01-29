'use client';
import { useParams } from 'next/navigation';
import {
  BorderLessButton,
  Container,
  DragHandleSection,
  TitleSection,
  Title,
  Divider,
  Form,
  Input,
  TextArea,
} from '../../clips.styles';
import VisibilityDropdown from '@/components/dropdowns/VisibilityDropdown';
import { VisibilityType } from '@/types/clip';
import { useClipFilter } from '@/hooks/clip/useClipFilter';
import ModifyDropdown from '@/components/dropdowns/ModifyDropdown';
import { useEditClipForm } from '@/hooks/form/useEditClipForm';
import { useClipQuery } from '@/hooks/clip/useClipQuery';
import { Stack } from '@mui/material';
import styled from 'styled-components';

export default function Page() {
  const { clipId } = useParams();
  const {
    clip: { data },
    clipList: { data: list },
  } = useClipQuery(clipId);
  const {
    errors,
    handleBack,
    handleCategorySelect,
    handleOutsideClick,
    handleSubmit,
    handleVisibilitySelect,
    onSubmit,
    register,
    trigger,
    onDelete,
    hiddenButtonRef,
  } = useEditClipForm();
  const { categories } = useClipFilter(list);

  if (!data) return;
  const { visible, category, link, title, id } = data;

  return (
    <Container>
      <TitleSection>
        <DragHandleSection>
          <BorderLessButton onClick={handleBack} disableRipple>
            back
          </BorderLessButton>
          <Stack direction={'column'}>
            <Divider />
            <Title>Edit Clip</Title>
          </Stack>
          <BorderLessButton onClick={handleOutsideClick} $color="#007AFF" disableRipple>
            Save
          </BorderLessButton>
        </DragHandleSection>
      </TitleSection>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VisibilityDropdown onSelect={handleVisibilitySelect} visible={visible as VisibilityType} />
        <ModifyDropdown onSelect={handleCategorySelect} categories={categories} category={category} />
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
        <BorderLessButton onClick={() => onDelete(id)} $color={'#f44336'} disableRipple>
          삭제
        </BorderLessButton>
        <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
      </Form>
    </Container>
  );
}
