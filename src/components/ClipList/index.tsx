import { Stack } from '@mui/material';
import styled from 'styled-components';
import Clip from '@/components/ClipCard';
import { IClipResponse } from '@/types/clip';
import { useEditClipForm } from '@/hooks/clip/useEditClipForm';

interface ClipList {
  list: IClipResponse[];
}
const ClipList = ({ list }: ClipList) => {
  const { handleClipClick } = useEditClipForm();
  return (
    <ListWrapper>
      {list.map((clip, index) => {
        return (
          <ClipItem key={index} onClick={() => handleClipClick(clip.id)}>
            <Clip {...clip} />
          </ClipItem>
        );
      })}
    </ListWrapper>
  );
};

export default ClipList;

const ListWrapper = styled(Stack)`
  padding: 0 1rem;
  display: flex;
  gap: 0.75rem;
  padding-bottom: 5rem;
`;

const ClipItem = styled(Stack)`
  &:hover button {
    opacity: 1;
  }
`;
