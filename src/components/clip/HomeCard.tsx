import { IClipResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { GitFork } from 'lucide-react';
import { CardTag } from '@/components/styled-components/Tag';

const HomeCard = ({ title, category, link, fork }: IClipResponse) => {
  const { background, text } = generateModernTagColors(Number(category.color));

  return (
    <ClipCard>
      <ClipContent>
        <ClipInfo>
          <TitleRow>
            <CardTag $bgColor={background} $textColor={text}>
              {category.name}
            </CardTag>
            <ClipTitle>{title}</ClipTitle>
          </TitleRow>
          <ClipUrl>{link}</ClipUrl>
        </ClipInfo>
        <ForkSection>
          <GitFork size={16} /> {fork || 0}
        </ForkSection>
      </ClipContent>
    </ClipCard>
  );
};

export default HomeCard;

const ClipCard = styled(Stack)<{ $isPublic?: boolean; $border?: string }>`
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.background.secondaryWithOpacity};
  backdrop-filter: blur(16px);
  border: 1px solid ${(props) => props.theme.background.secondaryWithOpacity};
  transition: all 0.2s;

  ${(props) => {
    if (props.$isPublic) {
      return `
        box-shadow: 0 0 0 2px ${props.$border};
      `;
    }
  }}

  &:hover {
    background-color: ${(props) => props.theme.background.secondary};
  }
`;

const ClipContent = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2px;
`;

const ClipInfo = styled(Stack)`
  flex: 1;
  min-width: 0;
  gap: 8px;
`;

const TitleRow = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;
`;

const ClipTitle = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.text.primary};
`;

const ClipUrl = styled(Typography)`
  font-size: 0.75rem;
  color: #a1a1aa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ForkSection = styled(Stack)`
  color: ${(props) => props.theme.text.placeholder};
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.text.primary};
  }
`;
