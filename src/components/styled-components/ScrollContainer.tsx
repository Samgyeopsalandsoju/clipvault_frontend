import styled from 'styled-components';
import { forwardRef, PropsWithChildren } from 'react';

const StyledDiv = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  min-height: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${(props) => props.theme.background.primary};
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollContainer = forwardRef<HTMLDivElement, PropsWithChildren<{}>>((props, ref) => {
  return <StyledDiv ref={ref} {...props} />;
});

ScrollContainer.displayName = 'ScrollContainer';
