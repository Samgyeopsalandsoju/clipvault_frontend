'use client';

import { DndContext, DragEndEvent, useSensor, useSensors, MouseSensor, MeasuringStrategy } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCategoryQuery } from '@/hooks';
import { CategoryCard, ConfirmModal } from '@/components';
import { useEffect, useState } from 'react';
import { ICategoryResponse } from '@/types';
import { Plus, Loader2 } from 'lucide-react';
import classNames from 'classnames';
import { generateModernTagColors } from '@/utils';

export const CategoryList = () => {
  const MAX_CATEGORY_COUNT = 10;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
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
        distance: 1,
        delay: 0,
        tolerance: 10,
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
      const newCategory = { name: 'new Category', color: String(colorHue), id: String(new Date().getMilliseconds()) };
      return [...prev, newCategory];
    });
  };

  // 삭제 확인 모달 열기
  const openDeleteModal = (id: string) => {
    setSelectedCategoryId(id);
    setIsOpen(true);
  };

  // 삭제
  const handleDelete = () => {
    if (!selectedCategoryId) return;
    setCategories((prev) => {
      return prev.filter((v) => v.id !== selectedCategoryId);
    });
    setSelectedCategoryId(null);
    setIsOpen(false);
  };
  // 모달 취소
  const handleCancel = () => {
    setSelectedCategoryId(null);
    setIsOpen(false);
  };

  // 카드 색상 업데이트 함수
  const updateCardColor = (id: string, newColor: string) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, color: newColor } : category
    );
    setCategories(updatedCategories);
  };

  // 카드 name 업데이트 함수
  const handleChangeName = (id: string, name: string) => {
    console.log('name', name);
    setCategories((prev) => {
      return prev.map((category) => (category.id === id ? { ...category, name } : { ...category }));
    });
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
          {/* 기존 카테고리 카드들 */}
          {categories &&
            categories.map((category) => {
              return (
                <CategoryCard
                  {...category}
                  key={category.id}
                  onChangeName={handleChangeName}
                  onChangeColor={updateCardColor}
                  onDelete={() => openDeleteModal(category.id)}
                />
              );
            })}
          {/* 새 카테고리 추가 버튼 */}
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
      {isOpen && (
        <ConfirmModal
          setIsOpen={setIsOpen}
          text={'Deleting this category will remove all clips within it.'}
          onAgree={handleDelete}
          onCancel={handleCancel}
        />
      )}
    </DndContext>
  );
};
