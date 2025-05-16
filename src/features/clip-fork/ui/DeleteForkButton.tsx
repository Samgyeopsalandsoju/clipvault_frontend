'use client';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { useDeleteFork } from '../hook/useDeleteFork';
import { IDeleteForkButton } from '../model/type';

export const DeleteForkButton = ({ clipId, forkId }: IDeleteForkButton) => {
  const { deleteFork } = useDeleteFork();

  const handleDelete = () => {
    if (window.confirm('포크 클립을 삭제 하시겠습니까?')) deleteFork({ clipId, forkId });
  };

  return (
    <div
      className={clsx(
        'p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer',
        'duration-500 ease-in-out hover:rotate-[20deg] transition-all text-gray-500 hover:text-red-500'
      )}
      onClick={handleDelete}
    >
      <Trash2 size={16} />
    </div>
  );
};
