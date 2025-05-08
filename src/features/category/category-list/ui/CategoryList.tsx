'use client';

import { Card } from '@/shared/ui/card';
import { Loader } from 'lucide-react';
import { useClipListStore } from '@/shared/data/model/clips.store';
import { MAX_CATEGORY_COUNT } from '../model/constant';
import { useGetCategory } from '../hook/useGetCategory';
import Tag from '@/entities/category-tag/ui/Tag';
import { memo } from 'react';

// 메모이제이션으로 최적화
export const CategoryList = memo(() => {
  const { categories, isLoading } = useGetCategory();
  const { setCategory } = useClipListStore();

  // 카테고리 선택
  const handleClickCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <Card className="p-2 pb-8">
      <div className="flex justify-between p-2">
        <h3 className="text-base md:text-lg font-semibold">카테고리</h3>
        <span className="text-sm text-gray-400">
          {categories?.length}/{MAX_CATEGORY_COUNT}
        </span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Loader size={50} className="animate-spin transition-all duration-1000" />
        </div>
      ) : categories?.length === 0 ? (
        <div className="flex justify-center items-center h-[150px] text-gray-500">카테고리가 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-3">
          <Tag name="All" onClick={() => handleClickCategory('all')} id="all" />
          {categories &&
            categories.map((category) => {
              return <Tag key={category.id} {...category} onClick={() => handleClickCategory(category.name)} />;
            })}
        </div>
      )}
    </Card>
  );
});
