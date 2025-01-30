import { IClipResponse } from '@/types/clip';
import { generateModernTagColors } from '@/utils/utils';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import { GitFork } from 'lucide-react';
import { CardTag } from '@/components/styled-components/Tag';
import { Card, ClipInfo, ClipTitle, ClipUrl, Content, TitleRow } from './clip.style';

const HomeCard = ({ title, category, link, fork, visible }: IClipResponse) => {
  const { background, text, border } = generateModernTagColors(Number(category.color));

  return (
    <Card $isPublic={visible === 'public'} $border={border}>
      <Content>
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
      </Content>
    </Card>
  );
};

export default HomeCard;

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
