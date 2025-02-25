'use client';

import { ClipCard } from '@/components/feature/clip/ClipCard';
import { ClipList } from '@/components/feature/clip/ClipList';
import { ShareInfoSection } from '@/components/feature/share/ShareInfoSection';
import { ScrollUpButton } from '@/components/ui/buttons/ScrollUpButton';
import { CategoriesTags } from '@/components/ui/tags/CategoriesTags';
import { useClipFilter, usePresignedUrl } from '@/hooks';
import { fetchShareFileData } from '@/services';
import { useClipStore } from '@/stores';
import { IClipResponse } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface IShareLink {
  id: string;
  title: string;
  clips: IClipResponse[];
  expiresAt: string;
}

const SharePage = () => {
  const { link_id } = useParams();
  const { generateGetUrl } = usePresignedUrl();
  const [shareData, setShareData] = useState<IShareLink>();
  const { getFilteredClips, setSelectedCategoryId } = useClipStore();
  const { categories } = useClipFilter((shareData?.clips as IClipResponse[]) || []);
  const clipList = getFilteredClips(shareData?.clips as IClipResponse[]);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const generatedUrl = await generateGetUrl(link_id as string);
    const data = await fetchShareFileData({ url: generatedUrl });
    setShareData(data);
  };

  useEffect(() => {
    fetchData();
  }, [link_id]);

  const renderItem = (clip: IClipResponse) => {
    return <ClipCard {...clip} />;
  };

  return (
    <>
      <ShareInfoSection title={shareData?.title || ''} due={shareData?.expiresAt || ''} />
      {categories.length > 1 && <CategoriesTags categories={categories} onSelect={setSelectedCategoryId} />}
      <div
        ref={containerRef}
        className="relative flex-1 pb-12 overflow-auto dark:bg-background-primary-dark scrollbar-none no-scroll"
      >
        <ClipList list={(clipList as IClipResponse[]) || []} renderItem={renderItem} />
        <ScrollUpButton scrollContainerRef={containerRef} />
      </div>
    </>
  );
};

export default SharePage;
