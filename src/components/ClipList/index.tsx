import { Stack } from '@mui/material';
import styled from 'styled-components';
import Clip from '@/components/ClipCard';
import { IClipResponse } from '@/types/clip';
import { useDetailClipForm } from '@/hooks/clip/useDetailClipForm';

interface ClipList {
  list: IClipResponse[];
}
const ClipList = ({ list }: ClipList) => {
  const { handleClipClick } = useDetailClipForm();
  return (
    <ListWrapper>
      {list.map((clip, index) => {
        return (
          <Stack key={index} onClick={() => handleClipClick(clip.id)}>
            <Clip {...clip} />
          </Stack>
        );
      })}
    </ListWrapper>
  );
};

export default ClipList;

const ListWrapper = styled(Stack)`
  gap: 16px;
  padding: 24px 24px 80px 24px;
  height: 100%;
`;
