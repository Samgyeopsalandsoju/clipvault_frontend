'use client';

import { CategoriesTags, ClipCard, ClipList, ScrollUpButton } from '@/components';
import { useClipFilter, usePresignedUrl } from '@/hooks';
import { fetchShareFileData } from '@/services';
import { IClipResponse, IShareLink } from '@/types';
import { Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SharePage = () => {
  const { link_id } = useParams();
  const { generateGetUrl } = usePresignedUrl();
  const [shareData, setShareData] = useState<IShareLink>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { filteredClipList, categories, handleCategorySelect } = useClipFilter(
    (shareData?.clips as IClipResponse[]) || []
  );

  const fetchData = useCallback(async () => {
    const generatedUrl = await generateGetUrl(link_id as string);
    const data = await fetchShareFileData({ url: generatedUrl });
    setShareData(data);
  }, [link_id, generateGetUrl]);

  useEffect(() => {
    fetchData();
  }, [link_id]);

  return (
    <PageContainer>
      {categories.length > 1 && <CategoriesTags categories={categories} onSelect={handleCategorySelect} />}
      <div
        ref={containerRef}
        className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
      >
        <ClipList
          list={(filteredClipList as IClipResponse[]) || []}
          renderItem={(clip) => (
            <div>
              <ClipCard {...clip} />
            </div>
          )}
        />
      </div>
      <ScrollUpButton scrollContainerRef={containerRef} />
    </PageContainer>
  );
};

export default SharePage;

const PageContainer = styled(Stack)`
  flex: 1;
  height: 100%;
  padding-bottom: 50px;
`;
