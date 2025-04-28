'use client';

import { useRef } from 'react';
import Slide from '@/entities/slide/ui/Slide';
import Slider from '@/shared/ui/Slider';
import { useNewestList } from '../hook';
import { useBreakpoint } from '@/shared/hooks/useBreakPoint';

function NewestList() {
  const { data, isLoading } = useNewestList();
  const breakpoint = useBreakpoint();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getShownCount = () => {
    if (breakpoint === 'mobile') {
      return 2;
    } else if (breakpoint === 'tablet') {
      return 3;
    } else {
      return 6;
    }
  };

  const GAP = 5;
  const PADDING = 60;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold px-[60px]">최근 등록된 링크</h1>
      <div className="flex w-full overflow-hidden relative h-[250px]" ref={containerRef}>
        {isLoading ? (
          <>Loading..</>
        ) : (
          <Slider
            current={containerRef.current}
            GAP={GAP}
            SHOWN_COUNT={getShownCount()}
            PADDING={PADDING}
            renderItem={(data, width, height) => {
              return <Slide key={data.id} {...data} cardWidth={width} cardHeight={height} />;
            }}
            data={data || []}
          />
        )}
      </div>
    </div>
  );
}

export default NewestList;
