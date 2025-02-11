'use client';

import { Button, Stack } from '@mui/material';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'lucide-react';
import classNames from 'classnames';
import { ICategoryResponse } from '@/types';
import { useOverflowDetection } from '@/hooks';
import { TabTag } from './Tag';
import { generateModernTagColors } from '@/utils';

interface ICategoriesTabsProps {
  categories: ICategoryResponse[];
  onSelect: (id: string) => void;
}

export const CategoriesTags = ({ categories, onSelect }: ICategoriesTabsProps) => {
  const { containerRef, contentRef, isExpanded, needsExpansion, setIsExpanded } = useOverflowDetection({
    data: categories,
  });

  return (
    <div className="py-2 px-4 relative" ref={containerRef}>
      <div
        className={classNames('gap-2 flex', {
          'flex-wrap h-auto': isExpanded,
          'whitespace-nowrap overflow-hidden': !isExpanded,
        })}
        ref={contentRef}
      >
        <TabTag
          onClick={() => {
            onSelect('');
            setIsExpanded(false);
          }}
        >
          All
        </TabTag>
        {categories.map((category, index) => {
          const colors = generateModernTagColors(Number(category.color));
          return (
            <TabTag
              key={index}
              $bgColor={colors.background}
              $textColor={colors.text}
              onClick={() => {
                onSelect(category.id);
                setIsExpanded(false);
              }}
            >
              {category.name}
            </TabTag>
          );
        })}

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
      </div>
    </div>
  );
};

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
