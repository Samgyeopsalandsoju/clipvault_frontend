import { Trash } from 'lucide-react';
import { useDeleteCategory } from '../hook/useDeleteCategory';

export const DeleteButton = ({ categoryId }: { categoryId: string }) => {
  const { deleteCategory } = useDeleteCategory();

  const handleDelete = () => {
    deleteCategory(categoryId);
  };

  return (
    <button className="absolute right-10 text-red-500 hover:text-red-600" onClick={handleDelete}>
      <Trash size={20} />
    </button>
  );
};
