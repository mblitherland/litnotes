import { createTheme } from '@mui/material/styles';

const getTheme = (name) => {
  return createTheme({
    palette: {
      mode: name,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
};

export default getTheme;
