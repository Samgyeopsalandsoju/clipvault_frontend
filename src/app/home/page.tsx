'use client';

import { Stack } from '@mui/material';
import styled from 'styled-components';

const HomePage = () => {
  return <Container></Container>;
};

export default HomePage;

const Container = styled(Stack)`
  width: 100%;
  flex: 1;
  padding: 12px;
  background-color: ${(props) => props.theme.background.primary};
`;
