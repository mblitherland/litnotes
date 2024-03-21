import { createTheme } from '@mui/material/styles';

// Mode can just be toggled to 'light' to change it to light mode
var theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;
