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
    initializeForm,
  } = useEditClipForm();
  const { categories } = useClipFilter(list);
  if (!data) return;

  initializeForm(data);
  const { visible, category, id } = data;

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
          placeholder="Clip Title"
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
          onBlur={() => trigger('title')}
        />
        <BorderLessButton onClick={() => onDelete(id)} $color={'#f44336'} disableRipple>
          Delete Clip
        </BorderLessButton>
        <button ref={hiddenButtonRef} type="submit" style={{ display: 'none' }} />
      </Form>
    </Container>
  );
}
