'use client';

import { DndContext, DragEndEvent, useSensor, useSensors, MouseSensor, MeasuringStrategy } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCategoryQuery } from '@/hooks';
import { CategoryCard } from '@/components';
import { memo, useEffect, useState } from 'react';
import { ICategoryResponse } from '@/types';
import { Plus, Loader2 } from 'lucide-react';
import classNames from 'classnames';
import { generateModernTagColors } from '@/utils';

const MemorizedCard = memo(CategoryCard);

export const CategoryList = () => {
  const MAX_CATEGORY_COUNT = 10;
  const {
    category: { categoryList, loading },
  } = useCategoryQuery();
  const [categories, setCategories] = useState<ICategoryResponse[]>(categoryList || []);

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategories((prevCategories) => {
        const oldIndex = prevCategories.findIndex((category) => category.id === active.id);
        const newIndex = prevCategories.findIndex((category) => category.id === over.id);
        return arrayMove([...prevCategories], oldIndex, newIndex);
      });
    }
  };

  const handleAddCategory = () => {
    const { colorHue } = generateModernTagColors();
    setCategories((prev) => {
      const newCategory = { name: 'new Category', color: String(colorHue), id: '' };
      return [...prev, newCategory];
    });
  };

  // 카드 색상 업데이트 함수
  const updateCardColor = (id: string, newColor: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, color: newColor } : category
    );
    setCategories(updatedCategories);
  };

  if (loading)
    return (
      <div className="h-[300px] w-hull flex justify-center items-center dark:text-text-placeholder-dark">
        <Loader2 className="animate-spin h-[60px] w-[60px]" />
      </div>
    );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <SortableContext items={categories.map((category) => category.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {categories &&
            categories.map((category, index) => {
              return <MemorizedCard {...category} key={index} onChangeColor={updateCardColor} />;
            })}

          {categories.length < MAX_CATEGORY_COUNT && (
            <div
              className={classNames(
                'border-2 border-dashed dark:border-border-focus-dark rounded-xl flex py-2 ml-7 justify-center gap-3',
                'dark:text-text-placeholder-dark cursor-pointer active:scale-[0.97] select-none'
              )}
              onClick={handleAddCategory}
            >
              <Plus />
              <div>Create category</div>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};
