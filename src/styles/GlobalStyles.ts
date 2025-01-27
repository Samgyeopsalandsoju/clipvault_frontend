import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Wanted Sans';
    src: url('/fonts/WantedSansVariable.ttf') format('truetype-variations');
    font-weight: 100 900;  // Variable 폰트의 weight 범위 설정
    font-style: normal;
    font-display: optional;   
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
