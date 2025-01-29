import { TabTag } from '@/components/styled-components/Tag';
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
            <TabTag
              key={index}
              $bgColor={colors.background}
              $textColor={colors.text}
              onClick={() => onSelect(category.id)}
            >
              {category.name}
            </TabTag>
          );
        })}
      </Tabs>
    </TagsContainer>
  );
};

export default CategoriesTabs;

const TagsContainer = styled(Stack)`
  width: 100%;
  padding: 0 1rem;
  &.active {
    cursor: grabbing;
  }
`;

const Tabs = styled(Stack)`
  display: inline-flex;
  overflow-x: auto;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  scrollbar-width: none;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
