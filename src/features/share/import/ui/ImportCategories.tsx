'use client';

import { memo } from 'react';
import { Card } from '@/shared/ui/shadcn';
import { ICategory } from '@/shared/data/types';
import { MAX_CATEGORY_COUNT } from '@/shared/data/constants';
import { ShareCategoryChip } from './ShareCategoryChip';

// 메모이제이션으로 최적화
export const ImportCategories = memo(
  ({ categories, onSelect }: { categories: ICategory[]; onSelect: (id: string) => void }) => {
    // 카테고리 선택
    const handleClickCategory = (category: string) => {
      onSelect(category);
    };

    return (
      <Card className="p-2 pb-8">
        <div className="flex justify-between p-2">
          <h3 className="text-base md:text-lg font-semibold">카테고리</h3>
          <span className="text-sm text-gray-400">
            {categories?.length}/{MAX_CATEGORY_COUNT}
          </span>
        </div>
        {categories?.length === 0 ? (
          <div className="flex justify-center items-center h-[150px] text-gray-500">카테고리가 없습니다.</div>
        ) : (
          <div className="flex flex-col gap-3">
            <ShareCategoryChip
              name="all"
              color="999"
              onClick={() => handleClickCategory('')}
              id="all"
              showEditButton={false}
            />
            {categories &&
              categories.map((category) => {
                return (
                  <ShareCategoryChip
                    key={category.id}
                    {...category}
                    onClick={() => handleClickCategory(category.id)}
                    showEditButton={true}
                  />
                );
              })}
          </div>
        )}
      </Card>
    );
  }
);
