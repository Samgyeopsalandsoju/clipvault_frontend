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
import classNames from 'classnames';
import Link from 'next/link';
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
  const [shareData, setShareData] = useState<IShareLink | null>();
  const { getFilteredClips, setSelectedCategoryId } = useClipStore();
  const { categories } = useClipFilter((shareData?.clips as IClipResponse[]) || []);
  const clipList = getFilteredClips(shareData?.clips as IClipResponse[]);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const generatedUrl = await generateGetUrl(link_id as string);

    try {
      const data = await fetchShareFileData({ url: generatedUrl });
      setShareData(data);
    } catch (error) {
      setShareData(null);
    }
  };
  console.log('shareData', shareData);
  useEffect(() => {
    fetchData();
  }, [link_id]);

  const renderItem = (clip: IClipResponse) => {
    return <ClipCard {...clip} />;
  };

  if (!shareData)
    return (
      <div className="h-[400px] m-auto text-center">
        <div className="flex flex-col gap-3">
          <h2 className="dark:text-text-primary-dark text-xl font-bold">This link has expired</h2>
          <p className="text-sm dark:text-text-placeholder-dark">
            The file is no longer available or the link has expired.
          </p>
          <Link
            href={'/home'}
            className={classNames(
              'dark:text-text-primary-dark w-[100px] m-auto rounded-lg',
              'border-[2px] border-dashed dark:border-border-secondary-dark p-1',
              'hover:dark:border-text-primary-dark'
            )}
          >
            go Home
          </Link>
        </div>
      </div>
    );

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
