import { useSetAtom } from 'jotai';
import { NewClipPageOpenAtom } from '../atom';
import { useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

const ClipDetailPage = () => {
  const setIsOpen = useSetAtom(NewClipPageOpenAtom);
  const router = useRouter();
  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [setIsOpen]);

  const handleBack = () => {
    setIsOpen(false);
    router.back();
  };

  const handleEdit = () => {
    setIsOpen(false);
    router.push('/clip/edit');
  };

  return (
    <Container>
      <DragHandleSection>
        <BorderLessButton onClick={handleBack} disableRipple>
          back
        </BorderLessButton>
        <DragHandle />
        <BorderLessButton onClick={handleEdit} $color="#007AFF" disableRipple>
          Edit
        </BorderLessButton>
      </DragHandleSection>
      <Wrapper>
        <Title>Clip</Title>
        <StyledInput disabled />
        <StyledInput disabled />
        <StyledInput disabled />
        <Textarea disabled />
      </Wrapper>
    </Container>
  );
};
export default ClipDetailPage;
