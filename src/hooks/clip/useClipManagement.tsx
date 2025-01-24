import { ICategoryResponse } from '@/types/clip';
import { useMemo, useState } from 'react';
import { useClip } from './clip/useClip';
import { useRouter } from 'next/navigation';

export const useClipManagement = () => {
  const {
    clipList: { data },
  } = useClip();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    return data.reduce((acc, clip) => {
      if (!seen.has(clip.category.id)) {
        seen.add(clip.category.id);
        acc.push(clip.category);
      }
      return acc;
    }, [] as ICategoryResponse[]);
  }, [data]);

  const handleCategorySelect = (id: string) => {
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(id);
    }
  };

  const filteredClipList = useMemo(() => {
    return selectedCategoryId ? data.filter((clip) => clip.category.id === selectedCategoryId) : data;
  }, [data, selectedCategoryId]);

  return { categories, handleCategorySelect, filteredClipList };
};
