'use client';

import { ScrollContainer } from '@/app/(client)/clips/clips.styles';
import CategoriesTags from '@/components/CategoriesTags';
import ClipCard from '@/components/clip/ClipCard';
import ClipList from '@/components/clip/ClipList';
import { useClipFilter } from '@/hooks/clip/useClipFilter';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { fetchShareFileData } from '@/services/shareService';
import { IClipResponse } from '@/types/clip';
import { IShareLink } from '@/types/share';
import { Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const SharePage = () => {
  const { link_id } = useParams();
  const { generateGetUrl } = usePresignedUrl();
  const [shareData, setShareData] = useState<IShareLink>();
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
    <Container>
      <CategoriesTags categories={categories} onSelect={handleCategorySelect} />
      <ScrollContainer>
        <ClipList
          list={(filteredClipList as IClipResponse[]) || []}
          renderItem={(clip) => (
            <div>
              <ClipCard {...clip} />
            </div>
          )}
        />
      </ScrollContainer>
    </Container>
  );
};

export default SharePage;

const Container = styled(Stack)`
  color: ${(props) => props.theme.text.primary};
  padding: 1rem;
`;
