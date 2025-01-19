import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    background: {
      default: '#fcfcfc',
    },
    primary: {
      main: '#000000', // Black for the button text and border
    },
  },
  typography: {
    fontFamily: 'Wanted Sans, Arial',
    // 개별 요소별 폰트 설정 가능
    h1: {
      fontFamily: 'Wanted Sans, Arial',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Wanted Sans, Arial',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Wanted Sans, Arial',
    },
    button: {
      fontFamily: 'Wanted Sans, Arial',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
        },
        contained: {},
      },
    },
  },
});

export default muiTheme;
