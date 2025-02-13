'use client';

import styled from 'styled-components';
import { IconButton, Stack } from '@mui/material';
import { ExternalLink, Copy, GitFork } from 'lucide-react';
import { generateModernTagColors } from '@/utils';
import { CardTag } from '@/components/ui';
import { IClipResponse } from '@/types/clip';
import { Card, ClipInfo, ClipTitle, ClipUrl, Content, TitleRow } from './clip.style';

export const ClipCard = ({ title, category, link, visible, forkedCount }: IClipResponse) => {
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
        <LinkButton>
          <Copy size={16} />
        </LinkButton>
        <Section>
          <LinkButton>
            <ExternalLink size={16} />
          </LinkButton>
          {visible === 'public' && (
            <ForkSection>
              <GitFork size={16} /> {forkedCount}
            </ForkSection>
          )}
        </Section>
      </Content>
    </Card>
  );
};

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
  position: relative; // 상대 위치 설정
`;

const ForkSection = styled(Stack)`
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  bottom: -24px;
  right: 8px;
  gap: 5px;
  color: ${(props) => props.theme.text.primary};
  font-size: 0.75rem;
`;
