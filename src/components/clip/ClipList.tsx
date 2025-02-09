import { Stack } from '@mui/material';
import styled from 'styled-components';
import { IClipResponse } from '@/types/clip';

interface ClipList {
  list: IClipResponse[];
  renderItem: (Clip: IClipResponse) => React.ReactNode;
}
const ClipList = ({ list, renderItem }: ClipList) => {
  return (
    <div className="flex flex-col p-4 gap-3 pb-8">
      {list.map((clip, index) => {
        return (
          <div className="group relative" key={index}>
            {renderItem(clip)}
          </div>
        );
      })}
    </div>
  );
};

export default ClipList;
