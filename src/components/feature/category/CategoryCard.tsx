'use client';

import { ICategoryResponse } from '@/types';
import { generateModernTagColors } from '@/utils';
import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import { GripVertical } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ModifyMode } from './mode/ModifyMode';
import { NormalMode } from './mode/NormalMode';

interface ICategoryCardProps extends ICategoryResponse {
  onChangeColor: (id: string, newColor: string) => void;
  onChangeName: (id: string, newName: string) => void;
  onDelete: () => void;
}

export const CategoryCard = ({ id, color, name, onChangeColor, onChangeName, onDelete }: ICategoryCardProps) => {
  const { background: bgColor, text: textColor, border: borderColor } = generateModernTagColors(Number(color));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempColor, setTempColor] = useState(color);
  const [newName, setNewName] = useState<string>(name);

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

  // 색 변경 부모 컴포넌트에 바로 업데이트
  const handleChangeColor = (): void => {
    const newColor = generateModernTagColors().colorHue;
    onChangeColor(id, String(newColor));
  };

  // 수정 모드 오픈
  const handleOpenEditingMode = (): void => {
    setIsEditing(true);
    setTempColor(color);
  };

  // 수정 캔슬
  const handleCancel = (): void => {
    setTempColor(color);
    onChangeColor(id, tempColor);
    setIsEditing(false);
  };

  // 수정 삭제
  const handleSave = (): void => {
    onChangeName(id, newName);
    setIsEditing(false);
  };

  // 수정 모드 집입시 인풋 포커싱
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

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
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
      >
        {isEditing ? (
          <ModifyMode
            inputRef={inputRef}
            newName={newName}
            onChangeName={(e: ChangeEvent<HTMLInputElement>) => {
              const { value } = e.currentTarget;
              if (value.length > 15) return;
              setNewName(e.currentTarget.value);
            }}
            onChangeColor={handleChangeColor}
            onSave={handleSave}
            onCancel={handleCancel}
            text={textColor}
            border={borderColor}
          />
        ) : (
          <NormalMode name={name} text={textColor} onDelete={onDelete} onEdit={handleOpenEditingMode} />
        )}
      </div>
    </div>
  );
};
