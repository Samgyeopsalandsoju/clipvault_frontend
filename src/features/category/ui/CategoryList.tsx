'use client';

import { Card } from '@/shared/ui/card';
import Tag from '@/shared/ui/Tag';
import { AddCategoryButton } from './AddCategoryButton';
import { Loader } from 'lucide-react';
import { useGetCategory } from '../hook/useGetCategory';
import { useClipListStore } from '@/features/clips/user-clips/model/store';
import { ICategory } from '@/shared/types/category';

export const CategoryList = () => {
  const { categories, isLoading } = useGetCategory();
  const { setCategory } = useClipListStore();
  const MAX_CATEGORY_COUNT = 10;

  // 카테고리 선택
  const handleClickCategory = (category: ICategory) => {
    setCategory(category);
  };

  return (
    <div>
      <div className="flex justify-between pb-2 pt-3 px-5">
        <h3 className="text-sm md:text-lg font-semibold">카테고리 선택</h3>
        <span className="text-sm text-gray-400">{categories?.length}/10</span>
      </div>
      <Card className="p-5 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-[150px]">
            <Loader size={50} className="animate-spin transition-all duration-1000" />
          </div>
        ) : categories?.length === 0 ? (
          <div className="flex justify-center items-center h-[150px] text-gray-500">
            카테고리가 없습니다.
          </div>
        ) : (
          <div className="flex flex-wrap gap-5">
            <Tag
              name="All"
              onClick={() => handleClickCategory({ color: '999', name: 'all', id: 'id' })}
              id="all"
            />
            {categories &&
              categories.map((category) => {
                return (
                  <Tag
                    key={category.id}
                    {...category}
                    onClick={() => handleClickCategory(category)}
                  />
                );
              })}
            {/* 카테고리 추가 버튼 */}
            {categories && categories.length < MAX_CATEGORY_COUNT && <AddCategoryButton />}
          </div>
        )}
      </Card>
    </div>
  );
};
