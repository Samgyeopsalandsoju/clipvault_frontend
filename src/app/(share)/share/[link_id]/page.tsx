'use client';

import CategoriesTags from '@/components/CategoriesTags';
import ClipCard from '@/components/clip/ClipCard';
import ClipList from '@/components/clip/ClipList';
import Footer from '@/components/Footer';
import ScrollUpButton from '@/components/ScrollUpButton';
import { ScrollContainer } from '@/components/styled-components/ScrollContainer';
import { useClipFilter } from '@/hooks/clip/useClipFilter';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { fetchShareFileData } from '@/services/shareService';
import { IClipResponse } from '@/types/clip';
import { IShareLink } from '@/types/share';
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
      <ScrollContainer ref={containerRef}>
        <ClipList
          list={(filteredClipList as IClipResponse[]) || []}
          renderItem={(clip) => (
            <div>
              <ClipCard {...clip} />
            </div>
          )}
        />
        <ScrollUpButton scrollContainerRef={containerRef} />
        <Footer />
      </ScrollContainer>
    </PageContainer>
  );
};

export default SharePage;

const PageContainer = styled(Stack)`
  flex: 1;
  height: 100%;
  padding-bottom: 50px;
`;
