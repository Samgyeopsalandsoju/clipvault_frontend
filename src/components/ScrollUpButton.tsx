import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChevronUp } from 'lucide-react';

interface ScrollUpButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollUpButton = ({ scrollContainerRef }: ScrollUpButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const toggleVisibility = () => {
      if (container.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', toggleVisibility);
    return () => {
      container.removeEventListener('scroll', toggleVisibility);
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <StyledButton onClick={scrollToTop}>
      <ChevronUp size={24} />
    </StyledButton>
  );
};
export default ScrollUpButton;

const StyledButton = styled.button`
  margin-right: 20px;
  position: sticky;
  bottom: 90px;
  left: 425px;
  border-radius: 20%;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  color: ${(props) => props.theme.text.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => props.theme.background.secondary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;
