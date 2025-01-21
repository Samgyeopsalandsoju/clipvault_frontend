// styles/theme.ts
import { DefaultTheme } from 'styled-components';

// styled-components를 위한 테마 타입을 정의합니다
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      textfield: string;
    };

    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };

    border: {
      primary: string;
      secondary: string;
      divider: string;
    };

    boxShadow: {
      primary: string;
      secondary: string;
    };
  }
}
