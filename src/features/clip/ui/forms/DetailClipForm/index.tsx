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

interface DetailClipFormProps {
  handleBack: () => void;
  handleEdit: () => void;
}

const DetailClipForm = ({ handleBack, handleEdit }: DetailClipFormProps) => {
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
export default DetailClipForm;
