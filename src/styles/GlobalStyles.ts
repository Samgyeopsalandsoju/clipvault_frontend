// // styles/globalStyles.ts
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`

// * {
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-rendering: optimizeLegibility;
//   }

//   /* 폰트 정의 */
// @font-face {
//   font-family: 'Wanted Sans';
//   src: url('/fonts/WantedSansVariable.woff2') format('woff2-variations');
//   font-weight: 100 900;  // Variable 폰트의 weight 범위 설정
//   font-style: normal;
//   font-display: swap;    // 폰트 로딩 중 텍스트가 보이지 않는 현상 방지
// }
//   /* Box sizing 규칙을 전역적으로 적용 */
//   *,
//   *::before,
//   *::after {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   /* HTML의 기본 동작을 개선 */
//   html {
//     /* 모바일에서 텍스트 크기가 자동으로 조정되는 것을 방지 */
//     -webkit-text-size-adjust: 100%;
//     /* 더 부드러운 폰트 렌더링을 위한 설정 */
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     /* 스크롤 동작을 부드럽게 만듦 */
//     scroll-behavior: smooth;
//   }

//   /* body의 기본 스타일 설정 */
//   body {
//     /* 기본 라인 높이 설정 */
//     line-height: 1.5;
//     /* 텍스트 렌더링 최적화 */
//     text-rendering: optimizeSpeed;
//     /* 시스템 기본 폰트 사용 */
//     font-family: 'Wanted Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
//     Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//     /* 워드랩 설정 */
//     word-wrap: break-word;
//   }

//   /* 기본 여백 제거 */
//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6,
//   p,
//   figure,
//   blockquote,
//   dl,
//   dd {
//     margin: 0;
//     padding: 0;
//   }

//   /* 목록의 기본 스타일 제거 */
//   ul,
//   ol {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//   }

//   /* 링크 스타일 초기화 */
//   a {
//     text-decoration: none;
//     color: inherit;
//   }

//   /* 이미지 관련 개선사항 */
//   img,
//   picture {
//     max-width: 100%;
//     display: block;
//   }

//   /* 폼 요소들의 기본 스타일 초기화 */
//   input,
//   button,
//   textarea,
//   select {
//     font: inherit;
//     /* iOS에서 기본 스타일 제거 */
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//   }

//   /* 버튼 스타일 초기화 */
//   button {
//     background: none;
//     border: none;
//     cursor: pointer;
//   }

//   /* 테이블 스타일 초기화 */
//   table {
//     border-collapse: collapse;
//     border-spacing: 0;
//   }

//   /* 기본 포커스 스타일 개선 */
//   :focus {
//     outline: 2px solid ${(props) => props.theme.fixed};
//     outline-offset: 2px;
//   }

//   /* reduced-motion 사용자를 위한 설정 */
//   @media (prefers-reduced-motion: reduce) {
//     html {
//       scroll-behavior: auto;
//     }

//     *,
//     *::before,
//     *::after {
//       animation-duration: 0.01ms !important;
//       animation-iteration-count: 1 !important;
//       transition-duration: 0.01ms !important;
//       scroll-behavior: auto !important;
//     }
//   }
// `;

// export default GlobalStyle;
// styles/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Wanted Sans';
    src: url('/fonts/WantedSansVariable.woff2') format('woff2-variations');
    font-weight: 100 900;  // Variable 폰트의 weight 범위 설정
    font-style: normal;
    font-display: swap;    // 폰트 로딩 중 텍스트가 보이지 않는 현상 방지
  }
  /* 모든 요소에 대한 기본 박스 모델 설정 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* HTML root 설정 */
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    height: 100%;
  }

  /* body 기본 설정 */
  body {
    background-color: ${(props) => props.theme.background.primary};
    height: 100%;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Wanted Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
      Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  /* HTML5 display-role reset */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  /* 텍스트 관련 요소 리셋 */
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /* 링크 스타일 리셋 */
  a {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
  }

  /* 폼 요소 리셋 */
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  button {
    background: none;
    cursor: pointer;
  }

  /* 목록 스타일 리셋 */
  ol, ul, menu {
    list-style: none;
  }

  /* 테이블 리셋 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 미디어 요소 리셋 */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* 텍스트 관련 요소 추가 리셋 */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* 폼 요소 추가 리셋 */
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 접근성 관련 */
  [hidden] {
    display: none;
  }

  /* 선택 스타일 */
  ::selection {
    background-color: #b3d4fc;
    color: #000;
    text-shadow: none;
  }
`;

export default GlobalStyles;
