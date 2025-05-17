import { BasicChip } from '@/shared/ui/category/BasicChip';
import { useClipListStore } from '@/shared/data/model/clips.store';
import { ICategoryChipProps } from '../model/types';
import { useModifyCategoryModalStore } from '../model/stores';

export const CategoryChip = ({ color, id, name, showEditButton }: ICategoryChipProps) => {
  const setIsOpen = useModifyCategoryModalStore((state) => state.setIsOpen);
  const setModifyCategory = useModifyCategoryModalStore((state) => state.setCategory);
  const { setCategory: setCategoryFilter } = useClipListStore();

  // 카테고리 모달 오픈
  const handleEdit = () => {
    setModifyCategory({ id, name, color });
    setIsOpen(true);
  };

  // 카테고리 필터
  const handleCategoryFilter = () => {
    setCategoryFilter(name);
  };

  return (
    <BasicChip
      name={name}
      color={color}
      showEditButton={showEditButton}
      onEditClick={handleEdit}
      onClick={handleCategoryFilter}
    />
  );
};
