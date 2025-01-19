'use client';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';
const HomePage = () => {
  return (
    <Container>
      <Title>home page~!</Title>
    </Container>
  );
};

export default HomePage;

const Container = styled(Stack)`
  padding: 32px;
`;

const Title = styled(Typography)`
  font-size: 50px;
  font-weight: 900;
`;
