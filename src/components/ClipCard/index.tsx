import { IClipResponse, ICreateClip } from '@/types/clip';
import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';

const Clip = ({ title, category, link }: IClipResponse | ICreateClip) => {
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
  background-color: ${(props) => props.theme.background.textfield};
  border: 1px solid ${(props) => props.theme.border.secondary};
  transition: all 0.3s ease;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  &:hover {
    transform: scale(1.02);
  }
`;

const Link = styled(Typography)`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled(Typography)`
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Category = styled(Stack)<{ $color: string }>`
  background-color: ${(props) => props.$color};
  padding: 3px 8px;
  color: #fff;
  border-radius: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
