import { Box, Stack, Typography } from '@mui/material';
import styled, { RuleSet } from 'styled-components';
import { ClipType } from '@/features/clip/model/clip.type';
import { metallicStyles } from '@/features/shared/utils';

const Clip = ({ title, category, fork, link }: ClipType) => {
  return (
    <Card>
      <Category $color={category.color}>{category.name}</Category>
      <Title>{title}</Title>
      <Link> {link}</Link>
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
  transition: all 0.3s ease;
  align-items: center;
  cursor: pointer;
`;

const Link = styled(Typography)`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled(Typography)`
  font-size: 18px;
`;

const Category = styled(Stack)<{ $color: string }>`
  background-color: ${(props) => props.$color};
  padding: 3px 8px;
  color: #fff;
  border-radius: 8px;
`;
