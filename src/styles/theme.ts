import { DefaultTheme } from 'styled-components/dist/types';

// styles/theme.ts
export const lightTheme: DefaultTheme = {
  background: {
    primary: '#E8E7DF',
    secondary: '#F8F7F4',
    tertiary: '#DEDCD1',
    textfield: '#fff',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
  },
  border: {
    primary: '#9CA3AF',
    secondary: '#E5E7EB',
    divider: '#F3F4F6',
  },
  boxShadow: {
    primary: 'rgba(31, 30, 29, 0.1)',
    secondary: 'rgba(31, 30, 29, 0.08)',
  },
};

export const darkTheme: DefaultTheme = {
  background: {
    primary: '#1F1E1D',
    secondary: '#3A3A38',
    tertiary: '#5E5D59',
    textfield: '#ddd',
  },
  text: {
    primary: '#F5F4EF',
    secondary: '#22211F',
    tertiary: '#9CA3AF',
  },
  border: {
    primary: '#726F6A',
    secondary: '#181715',
    divider: '#847F7A',
  },
  boxShadow: {
    primary: 'rgba(0, 0, 0, 0.25)',
    secondary: 'rgba(31, 30, 29, 0.2)',
  },
};
