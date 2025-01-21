import { useSetAtom } from 'jotai';
import { NewClipPageOpenAtom } from '../atom';
import { useEffect, useRef } from 'react';
import CategoryDropdown from '../components/dropdown/CategoryDropdown';
import { Category, ClipType, VisibilityType } from '../types';
import VisibilityDropdown from '../components/dropdown/VisibilityDropdown';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Container,
  DragHandle,
  BorderLessButton,
  StyledInput,
  Textarea,
  Title,
  Wrapper,
  DragHandleSection,
} from '../styles';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const ClipEditPage = () => {
  const setIsOpen = useSetAtom(NewClipPageOpenAtom);
  const router = useRouter();
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);
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

  // 숨겨진 버튼 클릭 트리거
  const handleOutsideClick = () => {
    if (hiddenButtonRef.current) {
      hiddenButtonRef.current.click();
    }
  };

  const onSubmit: SubmitHandler<ClipType> = (data) => {
    console.log('전체 데이터', data);
  };

  const handleBack = () => {
    router.back();
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
export default ClipEditPage;
