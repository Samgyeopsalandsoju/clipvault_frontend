'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import classNames from 'classnames';

interface ScrollUpButtonProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const ScrollUpButton = ({ scrollContainerRef }: ScrollUpButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const toggleVisibility = () => {
      if (container.scrollTop > 50) {
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
    <button
      className={classNames(
        'mr-[20px] sticky bottom-[55px] left-[425px] rounded-[20%] w-[2rem] h-[2rem] flex',
        'items-center justify-center cursor-pointer dark:text-text-primary-dark',
        'dark:bg-background-primary-dark border-solid border-[1px] dark:border-border-secondary-dark',
        'hover:translate-y-[-2px] hover:dark:bg-background-secondary-dark',
        'active:translate-y-0 transition-all duration-300 ease-in-out'
      )}
      onClick={scrollToTop}
    >
      <ChevronUp size={24} />
    </button>
  );
};
