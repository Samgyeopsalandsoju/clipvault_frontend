'use client';
import { themeModeAtom } from '@/features/shared/atoms';
import ThemeToggle from '@/features/shared/ui/ThemeToggle/ThemeToggle';
import { useAtom } from 'jotai';
import { Container, Title, ToggleButton, Wrapper } from './style';

const HomeContainer = () => {
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

export default HomeContainer;
