import { Stack } from '@mui/material';
import styled from 'styled-components';
import { IClipResponse } from '@/types/clip';

interface ClipList {
  list: IClipResponse[];
  renderItem: (Clip: IClipResponse) => React.ReactNode;
}
const ClipList = ({ list, renderItem }: ClipList) => {
  return (
    <ListWrapper>
      {list.map((clip, index) => {
        return <ClipItem key={index}>{renderItem(clip)}</ClipItem>;
      })}
    </ListWrapper>
  );
};

export default ClipList;

const ListWrapper = styled(Stack)`
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  padding-bottom: 4rem;
`;

const ClipItem = styled(Stack)`
  &:hover button {
    opacity: 1;
  }

  @media screen and (max-width: 1024px) {
    button {
      opacity: 1;
    }
  }
`;
