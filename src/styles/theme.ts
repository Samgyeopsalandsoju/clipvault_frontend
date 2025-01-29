import { DefaultTheme } from 'styled-components/dist/types';

// styles/theme.ts
export const lightTheme: DefaultTheme = {
  background: {
    primary: '#E8E7DF',
    secondary: '#F8F7F4',
    secondaryWithOpacity: '#27272a80',
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
    primary: '#18181b',
    secondary: '#27272a',
    secondaryWithOpacity: '#27272a80',
    tertiary: '#18181b',
    textfield: '#F5F4EF',
  },
  text: {
    primary: '#f4f4f5',
    secondary: '#fff',
    tertiary: '#9CA3AF',
    placeholder: '#71717a',
  },
  border: {
    primary: '#27272a',
    secondary: '#3f3f46',
    divider: '#847F7A',
    focus: '#52525b',
  },
};
