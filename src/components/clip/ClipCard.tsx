import { IClipResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { IconButton, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { ExternalLink, Copy, GitFork } from 'lucide-react';
import { CardTag } from '@/components/styled-components/Tag';

const Clip = ({ title, category, link, visible, fork }: IClipResponse) => {
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <ClipCard $isPublic={visible === 'public'} $border={border}>
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
        <LinkButton>
          <Copy size={16} />
        </LinkButton>
        <Section>
          <LinkButton>
            <ExternalLink size={16} />
          </LinkButton>
          {visible === 'public' && (
            <ForkSection>
              <GitFork size={20} /> {fork || 0}
            </ForkSection>
          )}
        </Section>
      </ClipContent>
    </ClipCard>
  );
};

export default Clip;

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

const LinkButton = styled(IconButton)`
  opacity: 0;
  transition: opacity 0.2s, background-color 0.2s;
  color: ${(props) => props.theme.text.primary};
  justify-content: end;
  &:hover {
    background-color: #3f3f46;
  }
`;

const Section = styled(Stack)`
  justify-content: space-between;
  height: 100%;
  position: relative;
`;

const ForkSection = styled(Stack)`
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
  color: ${(props) => props.theme.text.primary};
  font-size: 0.8rem;
  bottom: 0;
  right: 8px;
  svg {
    min-width: 12px;
    min-height: 12px;
  }
`;
