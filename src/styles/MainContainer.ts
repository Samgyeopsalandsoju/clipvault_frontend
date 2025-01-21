'use client';

import styled from 'styled-components';

export const MainContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  border: 1px solid ${(props) => props.theme.border.divider};
  border-radius: 12px;
  overflow: hidden;
  height: 100vh;
  background-color: ${(props) => props.theme.background.primary};
`;
