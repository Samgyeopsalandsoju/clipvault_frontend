import { IClipResponse } from '@/types/clip';

interface ClipList {
  list: IClipResponse[];
  renderItem: (Clip: IClipResponse) => React.ReactNode;
}
export const ClipList = ({ list, renderItem }: ClipList) => {
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
