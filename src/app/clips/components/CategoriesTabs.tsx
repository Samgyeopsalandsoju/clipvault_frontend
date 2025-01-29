import { Tag } from '@/components/styled/Tag';
import { useDragX } from '@/hooks/useDragX';
import { ICategoryResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { Stack } from '@mui/material';
import styled from 'styled-components';

interface ICategoriesTabsProps {
  categories: ICategoryResponse[];
  onSelect: (id: string) => void;
}

const CategoriesTabs = ({ categories, onSelect }: ICategoriesTabsProps) => {
  const { handleMouseDown, handleMouseLeave, handleMouseMove, isDragging, tabsRef, handleMouseUp } = useDragX();

  return (
    <TagsContainer className={isDragging ? 'active' : ''}>
      <Tabs
        ref={tabsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category, index) => {
          const colors = generateModernTagColors(Number(category.color));
          return (
            <Tag
              key={index}
              $bgColor={colors.background}
              $textColor={colors.text}
              onClick={() => onSelect(category.id)}
            >
              {category.name}
            </Tag>
          );
        })}
      </Tabs>
    </TagsContainer>
  );
};

export default CategoriesTabs;

const TagsContainer = styled(Stack)`
  width: 100%;
  &.active {
    cursor: grabbing; /* 드래그 중일 때 커서 */
  }
`;

const Tabs = styled(Stack)`
  display: inline-flex; /* 내용물 크기만큼 너비 확장 */
  overflow-y: auto;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  scrollbar-width: none;

  // 추가된 스타일
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
