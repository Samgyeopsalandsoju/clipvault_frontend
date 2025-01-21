import { Stack } from '@mui/material';
import styled from 'styled-components';
import Clip from './Clip';
import { ClipType } from '../../types';

const CLIP_LIST: ClipType[] = [
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
  {
    title: 'title1',
    category: '맛집',
    link: 'dfsadncdsanvklnsdlkvndslnvlknvldsanclkdsnclkdnlvnldsnvlksn',
    fork: '1',
  },
];

const ClipList = () => {
  return (
    <ListWrapper>
      {CLIP_LIST.map((clip, index) => {
        return (
          <Stack key={index}>
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
