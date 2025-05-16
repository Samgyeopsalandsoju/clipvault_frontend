import { ICategory } from '@/shared/data/types';
import { BasicChip } from '@/shared/ui/category/BasicChip';
import { useModifyModalStore } from '../modify-category/model/store';
import { useClipListStore } from '@/shared/data/model/clips.store';

export const CategoryChip = ({ color, id, name }: ICategory) => {
  const setIsOpen = useModifyModalStore((state) => state.setIsOpen);
  const setModifyCategory = useModifyModalStore((state) => state.setCategory);
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
      showEditButton={true}
      onEditClick={handleEdit}
      onClick={handleCategoryFilter}
    />
  );
};
