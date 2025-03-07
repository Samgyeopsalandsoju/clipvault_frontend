'use client';

import { ClipWithForked } from '@/types/clip';
import { HomeClipRefreshBtn } from './HomeClipRefreshBtn';

interface HomeClipList {
  list: ClipWithForked[];
  renderItem: (Clip: ClipWithForked) => React.ReactNode;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}
export const HomeClipList = ({ list, renderItem, scrollAreaRef }: HomeClipList) => {
  return (
    <div className="flex flex-col p-4 gap-3 pb-8">
      {list.map((clip, index) => {
        return (
          <div className="group relative" key={index}>
            {renderItem(clip)}
          </div>
        );
      })}
      <HomeClipRefreshBtn scrollAreaRef={scrollAreaRef} />
    </div>
  );
};
