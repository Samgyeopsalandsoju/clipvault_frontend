import { Stack } from '@mui/material';
import styled from 'styled-components';
import Clip from './Clip';
import { ClipType } from '../../types';
import { useRouter } from 'next/navigation';
const CLIP_LIST: ClipType[] = [
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#9E7B9B', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#DBF4A7', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#DBF4A7', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8AA399', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#D5F9DE', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#FF8C42', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
  {
    id: '123123',
    visible: 'private',
    title: 'title1',
    category: { name: '맛집', color: '#8C271E', id: '' },
    link: 'https://chzzk.naver.com/live/8803cee946a9e610a76fbdee98d98c61',
    fork: '1',
  },
];
const ClipList = () => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/clip/detail`);
  };
  return (
    <ListWrapper>
      {CLIP_LIST.map((clip, index) => {
        return (
          <Stack key={index} onClick={() => handleClick(clip.id)}>
            <Clip {...clip} />
          </Stack>
        );
      })}
    </ListWrapper>
  );
};

export default ClipList;

const ListWrapper = styled(Stack)`
  gap: 16px;
  padding: 24px 24px 80px 24px;
`;
