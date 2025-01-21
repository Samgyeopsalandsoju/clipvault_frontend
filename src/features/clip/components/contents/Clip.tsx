import { Box, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { ClipType } from '../../types';
import { FaCodeFork } from 'react-icons/fa6';

const Clip = ({ title, category, fork, link }: ClipType) => {
  return (
    <Card>
      <Category>{category}</Category>
      <Title>{title}</Title>
      <ForkSection>
        <FaCodeFork fontSize={20} />
        <ForkText>Fork</ForkText>
        <ForkCount>{fork}</ForkCount>
      </ForkSection>
    </Card>
  );
};

export default Clip;

const Card = styled(Stack)`
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  border-radius: 12px;
  background-color: beige;
  align-items: center;
`;

const Title = styled(Typography)`
  font-size: 18px;
  width: 200px;
`;

const Category = styled(Stack)`
  background-color: lightcoral;
  width: 200px;
`;

const ForkSection = styled(Stack)`
  flex-direction: row;
  gap: 5px;
`;

const ForkText = styled(Typography)`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
const ForkCount = styled(Box)`
  border-radius: 100%;
  background-color: lightgray;
  width: 25px;
  height: 25px;
  justify-content: center;
  display: flex;
  align-items: center;
`;
