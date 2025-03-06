import { ClipWithForked } from '@/types/clip';

interface HomeClipList {
  list: ClipWithForked[];
  renderItem: (Clip: ClipWithForked) => React.ReactNode;
}
export const HomeClipList = ({ list, renderItem }: HomeClipList) => {
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
