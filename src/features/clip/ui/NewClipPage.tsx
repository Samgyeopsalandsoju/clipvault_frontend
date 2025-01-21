import { useSetAtom } from 'jotai';
import { NewClipPageOpenAtom } from '../atom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Stack, TextField, Typography } from '@mui/material';
import CategoryDropdown from '../components/dropdown/CategoryDropdown';
import { Category, ClipType, VisibilityType } from '../types';
import VisibilityDropdown from '../components/dropdown/VisibilityDropdown';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SolidCustomButton } from '@/shared/components/button';

const NewClipPage = () => {
  const setIsOpen = useSetAtom(NewClipPageOpenAtom);
  const {
    register,
    trigger,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClipType>({
    mode: 'onChange',
  });

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  // 카테고리 선택
  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category);
    setValue('category', category);
  };
  // 공개 범위 선택
  const handleVisibilitySelect = (visibility: VisibilityType) => {
    console.log('Selected Visibility:', visibility);
    setValue('visible', visibility);
  };

  const onSubmit: SubmitHandler<ClipType> = (data) => {
    console.log('전체 데이터', data);
  };

  return (
    <Container>
      <DragHandle />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Title>Create Clip </Title>
          <VisibilityDropdown onSelect={handleVisibilitySelect} />
          <CategoryDropdown onSelect={handleCategorySelect} />
          <TextField
            placeholder="클립 이름을 지어주세요!"
            sx={{ width: '300px' }}
            size="small"
            id="outlined-error"
            maxLength={30}
            error={!!errors.title}
            helperText={errors.title?.message || ' '}
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
          <TextField
            placeholder="link를 복사 붙여넣기 해주세요!"
            multiline
            rows={4}
            maxRows={4}
            sx={{ width: '300px' }}
            size="small"
            {...register('link', {
              required: '저장할 링크를 복사 붙여넣기 해주세요!',
            })}
            onBlur={() => trigger('title')}
            error={!!errors?.link}
            helperText={errors.link?.message || ' '}
          />
          <SolidCustomButton type="submit" sx={{ width: '300px' }}>
            클립 만들기!
          </SolidCustomButton>
        </Wrapper>
      </form>
    </Container>
  );
};
export default NewClipPage;

const Container = styled(Stack)`
  padding: 0px 32px 32px 32px;
  align-items: center;
  width: 100%;
  pad: 20px;
`;

const Wrapper = styled(Stack)`
  width: 100%;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const DragHandle = styled(Stack)`
  width: 40px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 12px auto;
  cursor: grab;
`;

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -2px;
`;
