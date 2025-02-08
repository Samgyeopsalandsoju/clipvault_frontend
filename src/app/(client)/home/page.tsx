'use client';

import ClipList from '@/components/clip/ClipList';
import HomeCard from '@/components/clip/HomeCard';
import TotalClipCount from '@/components/count/TotalClipCount';
import TotalShared from '@/components/count/TotalShared';
import Footer from '@/components/Footer';
import ScrollUpButton from '@/components/ScrollUpButton';
import { ScrollContainer } from '@/components/styled-components/ScrollContainer';
import { useHomeClipQuery } from '@/hooks/home/useHomeClipQuery';
import { Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const {
    home: { list },
  } = useHomeClipQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollContainer ref={containerRef}>
      <HeroContainer>
        <TitleSection>
          <Title>Discover & Share</Title> <Highlight as={'span'}>Valuable Links</Highlight>
        </TitleSection>

        <Subtitle>Explore the community's curated links</Subtitle>
        <Divider />
      </HeroContainer>
      <CountSection>
        <TotalClipCount />
        <TotalShared />
      </CountSection>

      <ClipList
        list={list}
        renderItem={(clip) => (
          <div>
            <HomeCard {...clip} />
          </div>
        )}
      />
      <ScrollUpButton scrollContainerRef={containerRef} />
    </ScrollContainer>
  );
};

export default HomePage;

const HeroContainer = styled(Stack)`
  width: 100%;
  padding: 2rem 1rem 1rem 1rem;
  background-color: ${(props) => props.theme.background.primary};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  text-align: center;
  color: ${(props) => props.theme.text.primary};
  user-select: none;
`;

const Subtitle = styled(Typography)`
  color: ${(props) => props.theme.text.tertiary};
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.5;
  user-select: none;
  padding: 0 1rem;
`;

const TitleSection = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Divider = styled(Stack)`
  width: 4rem;
  height: 1px;
  margin: 1.5rem auto 0;
  background: ${(props) => props.theme.text.tertiary};
  opacity: 0.3;
`;
const Highlight = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
  border-radius: 5px;
  padding: 4px 6px;
  background-color: ${(props) => props.theme.text.primary};
  color: ${(props) => props.theme.background.primary};
  font-weight: 700;
  user-select: none;
  line-height: 1.5;
`;

const CountSection = styled(Stack)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
