import { IForkedClipResponse } from '@/types';

interface ClipList {
  list: IForkedClipResponse[];
  renderItem: (Clip: IForkedClipResponse) => React.ReactNode;
}
export const ForkedList = ({ list, renderItem }: ClipList) => {
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
