import { DefaultTheme } from 'styled-components/dist/types';

// styles/theme.ts
export const lightTheme: DefaultTheme = {
  background: {
    primary: '#E8E7DF',
    secondary: '#F8F7F4',
    tertiary: '#DEDCD1',
    textfield: '#F5F4EF',
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
  },
  border: {
    primary: '#9CA3AF',
    secondary: '#e6e8e9',
    divider: '#828282',
  },
};

export const darkTheme: DefaultTheme = {
  background: {
    primary: '#1F1E1D',
    secondary: '#2F2F2B',
    tertiary: '#5E5D59',
    textfield: '#F5F4EF',
  },
  text: {
    primary: '#F5F4EF',
    secondary: '#fff',
    tertiary: '#9CA3AF',
  },
  border: {
    primary: '#726F6A',
    secondary: '#e6e8e9',
    divider: '#847F7A',
  },
};
