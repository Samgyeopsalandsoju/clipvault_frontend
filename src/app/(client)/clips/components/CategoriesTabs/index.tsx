import { useDragX } from '@/hooks/useDragX';
import { ICategoryResponse } from '@/types/clip';
import { Stack } from '@mui/material';
import styled from 'styled-components';

interface ICategoriesTabsProps {
  categories: ICategoryResponse[];
  onSelect: (id: string) => void;
}

const CategoriesTabs = ({ categories, onSelect }: ICategoriesTabsProps) => {
  const { handleMouseDown, handleMouseLeave, handleMouseMove, isDragging, tabsRef, handleMouseUp } = useDragX();
  return (
    <Container className={isDragging ? 'active' : ''}>
      <Tabs
        ref={tabsRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category, index) => {
          return (
            <Tab key={index} $color={category.color} onClick={() => onSelect(category.id)}>
              {category.name}
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default CategoriesTabs;

const Container = styled(Stack)`
  width: 100%;
  padding: 8px 24px 0 24px;
  &.active {
    cursor: grabbing; /* 드래그 중일 때 커서 */
  }
`;

const Tabs = styled(Stack)`
  display: inline-flex; /* 내용물 크기만큼 너비 확장 */
  overflow-y: auto;
  flex-direction: row;
  gap: 10px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled(Stack)<{ $color: string }>`
  background-color: ${(props) => props.$color};
  padding: 4px 15px;
  border-radius: 10px;
  cursor: pointer;
  /* 탭이 줄어들지 않도록 설정 */
  flex-shrink: 0;
  white-space: nowrap;
  user-select: none;
`;
