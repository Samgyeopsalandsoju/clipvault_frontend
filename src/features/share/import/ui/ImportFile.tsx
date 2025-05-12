'use client';

import { useParams } from 'next/navigation';
import { usePresignedUrl } from '@/shared/core/hooks';
import { useCallback, useEffect, useState } from 'react';
import { fetchShareFileData } from '../service';
import { IClip } from '@/shared/data/types';
import { ClipCardEntry } from '@/entities/clip';
import { ImportCategories } from './ImportCategories';
import { useClip } from '../hook/useClip';
import { Card } from '@/shared/ui/shadcn';
import { CountDownTimer } from '@/shared/ui/CountDownTimer';
import Link from 'next/link';
import clsx from 'clsx';
import { useClipStore } from '../model/store';

interface IShareLink {
  id: string;
  title: string;
  clips: IClip[];
  expiresAt: string;
}

export const ImportFile = () => {
  const { id } = useParams();
  const { generateGetUrl } = usePresignedUrl();
  const [shareData, setShareData] = useState<IShareLink | null>();
  const { categories } = useClip((shareData?.clips as IClip[]) || []);
  const { getFilteredClips, setSelectedCategoryId } = useClipStore();
  const clipList = getFilteredClips(shareData?.clips as IClip[]);

  const fetchData = useCallback(async () => {
    try {
      const url = await generateGetUrl(id as string);
      const data = await fetchShareFileData({ url: url });
      setShareData(data);
    } catch (error) {
      setShareData(null);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const renderItems = useCallback((clip: IClip) => {
    return <ClipCardEntry key={clip.id} {...clip} />;
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
      <div className="md:sticky md:top-20  self-start flex flex-col gap-4">
        <ImportCategories categories={categories} onSelect={setSelectedCategoryId} />
      </div>
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Card className="p-5 px-10 flex gap-5 items-center ">
          <h1 className="text-lg md:text-xl font-semibold">{shareData?.title}</h1>
          <h3> {CountDownTimer({ targetDate: shareData?.expiresAt || '' })}</h3>
        </Card>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clipList && clipList.map((clip) => renderItems(clip))}
        </ul>
      </div>
    </section>
  );
};
