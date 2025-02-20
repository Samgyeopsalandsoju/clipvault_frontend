'use client';

import { ICategoryResponse } from '@/types';
import { generateModernTagColors } from '@/utils';
import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import { Pen, GripVertical, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

interface ICategoryCardProps extends ICategoryResponse {}

export const CategoryCard = ({ id, color, name }: ICategoryCardProps) => {
  const { background, text, border } = generateModernTagColors(Number(color));
  const [cardColor, setCardColor] = useState<{ background: string; text: string; border: string }>({
    background,
    text,
    border,
  });
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, setActivatorNodeRef } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    position: 'relative',
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : '',
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'auto',
    touchAction: 'none',
    userSelect: 'none',
    zIndex: isDragging ? 1 : 0,
  };

  const handleChangeColor = () => {
    const color = generateModernTagColors();
    setCardColor({ background: color.background, text: color.text, border: color.border });
  };

  return (
    <div
      className={classNames('flex items-center gap-1', isDragging && 'shadow-lg')}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        className={classNames('dark:text-text-placeholder-dark cursor-grab', isDragging && 'cursor-grabbing')}
        {...listeners}
        ref={setActivatorNodeRef}
      >
        <GripVertical size={26} />
      </div>
      <div
        className={classNames('border-solid border-[1px] flex justify-between px-4 py-2', 'rounded-xl w-full')}
        style={{
          backgroundColor: cardColor.background,
          borderColor: cardColor.border,
        }}
      >
        <div
          className="dark:text-text-primary-dark select-none cursor-pointer active:rotate-180 transition-transform duration-200"
          style={{
            color: cardColor.text,
          }}
          onClick={handleChangeColor}
        >
          <RefreshCcw />
        </div>
        <div
          className="dark:text-text-primary-dark select-none"
          style={{
            color: cardColor.text,
          }}
        >
          {name}
        </div>
        <div
          className={classNames(
            'dark:text-text-placeholder-dark cursor-pointer hover:dark:text-text-primary-dark select-none',
            'flex justify-center items-center'
          )}
        >
          <Pen size={18} />
        </div>
      </div>
    </div>
  );
};
