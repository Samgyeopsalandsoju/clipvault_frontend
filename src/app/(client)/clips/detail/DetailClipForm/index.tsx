import { ICreateClip } from '@/types/clip';
import {
  BorderLessButton,
  Container,
  DragHandle,
  DragHandleSection,
  StyledInput,
  Textarea,
  Title,
  Wrapper,
} from '../../styles';

interface DetailClipFormProps {
  handleBack: () => void;
  handleEdit: () => void;
  clipInfo: ICreateClip | undefined;
}

const DetailClipForm = ({ handleBack, handleEdit, clipInfo }: DetailClipFormProps) => {
  if (!clipInfo) return;
  const { title, category, link, visible } = clipInfo;
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
        <StyledInput value={visible === 'private' ? '비공개' : '공개'} disabled />
        <StyledInput $color={category.color} value={category.name} disabled />
        <StyledInput value={title} disabled />
        <Textarea value={link} disabled />
      </Wrapper>
    </Container>
  );
};
export default DetailClipForm;
