'use client';

import { TabTag } from '@/components/styled-components/Tag';
import { ICategoryResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { Button, Stack } from '@mui/material';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useOverflowDetection } from '@/hooks/useOverflowDetection';

interface ICategoriesTabsProps {
  categories: ICategoryResponse[];
  onSelect: (id: string) => void;
}

const CategoriesTags = ({ categories, onSelect }: ICategoriesTabsProps) => {
  const { containerRef, contentRef, isExpanded, needsExpansion, setIsExpanded } = useOverflowDetection({
    data: categories,
  });

  return (
    <TagsContainer ref={containerRef}>
      <Tabs ref={contentRef} $isExpanded={isExpanded}>
        <TabTag onClick={() => onSelect('')}>All</TabTag>
        {categories.map((category, index) => {
          const colors = generateModernTagColors(Number(category.color));
          return (
            <TabTag
              key={index}
              $bgColor={colors.background}
              $textColor={colors.text}
              onClick={() => {
                onSelect(category.id);
                setIsExpanded((prev) => !prev);
              }}
            >
              {category.name}
            </TabTag>
          );
        })}
        {needsExpansion && (
          <ExpansionButtonContainer>
            <ExpansionButton
              $isExpanded={isExpanded}
              onClick={() => {
                setIsExpanded((prev) => !prev);
              }}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </ExpansionButton>
          </ExpansionButtonContainer>
        )}
      </Tabs>
    </TagsContainer>
  );
};

export default CategoriesTags;

const TagsContainer = styled(Stack)`
  padding: 0.5rem 1rem;
  position: relative;
`;

const Tabs = styled(Stack)<{ $isExpanded: boolean }>`
  gap: 0.5rem;
  flex-direction: row;
  ${({ $isExpanded }) => $isExpanded && `flex-wrap: wrap;  height: auto;`}
  ${({ $isExpanded }) => !$isExpanded && `white-space: nowrap; overflow: hidden;`}
`;

const ExpansionButtonContainer = styled(Stack)`
  position: absolute;
  right: 1rem;
  bottom: 0;
  display: flex;
  align-items: center;
  transform: translateY(-31%);
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  background: rgba(40, 40, 40, 0.8);
  backdrop-filter: blur(8px);
  padding: 2px;

  &::before {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    height: 100%;
    width: 24px;
  }
`;

const ExpansionButton = styled(Button)<{ $isExpanded: boolean }>`
  min-width: 24px !important;
  width: 24px;
  height: 24px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    color: white;
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateY(${(props) => (props.$isExpanded ? '-1px' : '1px')});
  }
`;
