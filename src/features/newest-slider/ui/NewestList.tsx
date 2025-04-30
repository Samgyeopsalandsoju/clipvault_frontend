'use client';

import { useRef } from 'react';
import Slider from '@/shared/ui/Slider';
import { useBreakpoint } from '@/shared/hooks/useBreakPoint';
import { useNewestList } from '../hook/useNewestList';
import { Slide } from '@/entities/slide';

export const NewestList = () => {
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

  const getPadding = () => {
    if (breakpoint === 'desktop') {
      return 60;
    } else {
      return 16;
    }
  };

  const GAP = 5;
  const PADDING = getPadding();
  const SHOWN_COUNT = getShownCount();
  return (
    <div className="w-full">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold px-[16px] lg:px-[60px]">
        최근 등록된 링크
      </h1>
      <div className="flex w-full overflow-hidden relative h-[270px]" ref={containerRef}>
        {isLoading ? (
          <>Loading..</>
        ) : (
          <Slider
            current={containerRef.current}
            GAP={GAP}
            SHOWN_COUNT={SHOWN_COUNT}
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
};
