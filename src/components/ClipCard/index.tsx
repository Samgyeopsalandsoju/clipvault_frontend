import { IClipResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { IconButton, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { ExternalLink, Copy, GitFork } from 'lucide-react';
import { CardTag } from '@/components/styled/Tag';

const Clip = ({ title, category, link }: IClipResponse) => {
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
        <LinkButton>
          <Copy size={16} />
        </LinkButton>
        <LinkButton>
          <ExternalLink size={16} />
        </LinkButton>
      </ClipContent>
    </ClipCard>
  );
};

export default Clip;

const ClipCard = styled(Stack)`
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.background.secondaryWithOpacity};
  backdrop-filter: blur(16px);
  border: 1px solid ${(props) => props.theme.background.secondaryWithOpacity};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.background.secondary};
  }
`;

const ClipContent = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

const ClipInfo = styled(Stack)`
  flex: 1;
  min-width: 0;
  gap: 1rem;
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

  &:hover {
    background-color: #3f3f46;
  }
`;
