import { DefaultTheme } from 'styled-components/dist/types';

// styles/theme.ts
export const lightTheme: DefaultTheme = {
  background: {
    primary: '#fff', // 순수 흰색 - 메인 배경
    secondary: '#F3F4F6', // 연한 회색 - 카드 배경
    tertiary: '#E5E7EB', // 좀 더 진한 회색 - 호버 상태
    textfield: '',
  },
  text: {
    primary: '#111827', // 진한 차콜색 - 주요 텍스트
    secondary: '#4B5563', // 중간 회색 - 부가 설명
    tertiary: '#9CA3AF', // 밝은 회색 - 비활성화
  },
  border: {
    primary: '#9CA3AF', // 중간 회색으로 변경 - 뚜렷한 구분이 필요할 때
    secondary: '#E5E7EB', // 연한 회색 - 부드러운 구분이 필요할 때
    divider: '#F3F4F6', // 매우 연한 회색 - 미세한 구분선
  },
  boxShadow: {
    primary: 'rgba(31, 30, 29, 0.1)',
    secondary: 'rgba(31, 30, 29, 0.08)',
  },
};

export const darkTheme: DefaultTheme = {
  background: {
    primary: '#1F1E1D', // 진한 차콜색 - 메인 배경
    secondary: '#3A3A38', // 진한 곤색 - 카드 배경
    tertiary: '#5E5D59', // 중간 진한 회색 - 호버 상태
    textfield: '#ddd',
  },
  text: {
    primary: '#F5F4EF', // 흰색에 가까운 회색 - 주요 텍스트
    secondary: '#22211F', // 밝은 회색 - 부가 설명
    tertiary: '#9CA3AF', // 중간 회색 - 비활성화
  },
  border: {
    primary: '#726F6A', // 더 밝은 회색 - 뚜렷한 구분이 필요할 때
    secondary: '#181715', // 중간 진한 회색 - 부드러운 구분이 필요할 때
    divider: '#847F7A', // 약간 더 밝은 곤색 - 미세한 구분선
  },
  boxShadow: {
    primary: 'rgba(0, 0, 0, 0.25)',
    secondary: 'rgba(31, 30, 29, 0.2)',
  },
};
