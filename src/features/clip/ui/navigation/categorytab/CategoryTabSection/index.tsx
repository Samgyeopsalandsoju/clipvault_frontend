import { useDragX } from '@/features/shared/model/hooks/useDragX';
import { Stack } from '@mui/material';
import styled from 'styled-components';

const CATEGORY = [
  {
    id: '1',
    name: '먹방',
    color: 'hsl(117, 37%, 67%)',
  },
  {
    id: '2',
    name: '공부',
    color: 'hsl(261, 29%, 75%)',
  },
  {
    id: '3',
    name: '재밌는거',
    color: 'hsl(300, 23%, 62%)',
  },
  {
    id: '4',
    name: '운동',
    color: 'hsl(147, 24%, 75%)',
  },
  {
    id: '5',
    name: '영화추천',
    color: 'hsl(213, 33%, 74%)',
  },
  {
    id: '5',
    name: '영화추천',
    color: 'hsl(51, 38%, 70%)',
  },
];

const CategoryTabSection = () => {
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
        {CATEGORY.map((item, index) => {
          return (
            <Tab key={index} $color={item.color}>
              {item.name}
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default CategoryTabSection;

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
