'use client';

import { ScrollContainer } from '../clips/clips.styles';
import ClipList from '@/components/clip/ClipList';
import HomeCard from '@/components/clip/HomeCard';
import TotalClipCount from '@/components/count/TotalClipCount';
import TotalShared from '@/components/count/TotalShared';
import { useHomeClipQuery } from '@/hooks/home/useHomeClipQuery';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

const HomePage = () => {
  const {
    home: { list },
  } = useHomeClipQuery();
  return (
    <ScrollContainer>
      <HeroContainer>
        <Title>
          Discover & Share <Highlight as={'span'}>Valuable Links</Highlight>
        </Title>
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

const Divider = styled(Stack)`
  width: 4rem;
  height: 1px;
  margin: 1.5rem auto 0;
  background: ${(props) => props.theme.text.tertiary};
  opacity: 0.3;
`;
const Highlight = styled(Typography)`
  border-radius: 5px;
  padding: 4px 6px;
  background-color: ${(props) => props.theme.text.primary};
  color: ${(props) => props.theme.background.primary};
  font-weight: 700;
  user-select: none;
`;

const CountSection = styled(Stack)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
