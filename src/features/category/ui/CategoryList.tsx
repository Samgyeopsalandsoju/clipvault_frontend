'use client';

import { Loader, ChevronUp, ChevronDown } from 'lucide-react';
import { memo, useState } from 'react';
import { Card } from '@/shared/ui/shadcn';
import { useGetCategory } from '../hooks/useGetCategory';
import { MAX_CATEGORY_COUNT } from '@/shared/data/constants';
import { CategoryChip } from './CategoryChip';
import { AnimatePresence, motion } from 'framer-motion';

// 메모이제이션으로 최적화
export const CategoryList = memo(() => {
  const { categories, isLoading } = useGetCategory();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
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
          <div className="flex" onClick={handleToggle}>
            <CategoryChip name="all" color="999" id="all" showEditButton={false} />
            <div className="w-10 flex items-center justify-center cursor-pointer">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex flex-col gap-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                {categories.map((category) => (
                  <CategoryChip key={category.id} {...category} showEditButton={true} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Card>
  );
});
