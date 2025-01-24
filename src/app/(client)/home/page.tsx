'use client';

import { themeModeAtom } from '@/atoms/theme.atom';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import styled from 'styled-components';

const HomePage = () => {
  const [isDark, setIsDark] = useAtom(themeModeAtom);
  return (
    <Container>
      <Wrapper>
        <Title>Share Link</Title>
        <ToggleButton>
          <ThemeToggle isDark={isDark} onChange={() => setIsDark((prev) => !prev)} size="small" />
        </ToggleButton>
      </Wrapper>
    </Container>
  );
};

export default HomePage;

const Container = styled(Stack)`
  width: 100%;
  flex: 1;
  padding: 12px;
  background-color: ${(props) => props.theme.background.primary};
  border-bottom: 1px solid ${(props) => props.theme.border.divider};
`;

const Wrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const Title = styled(Typography)`
  color: ${(props) => props.theme.text.primary};
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 2px;
  flex: 1;
  text-align: center;
`;

const ToggleButton = styled(Stack)`
  position: absolute;
  right: 0;
`;
