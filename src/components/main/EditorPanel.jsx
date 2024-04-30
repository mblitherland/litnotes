import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditorPanel = ({ index, tabInfo }) => {

  return (
    <Box sx={{ padding : 2 }}>
      <Typography >This is an empty TabPanel</Typography>
      <Typography >My index is {index}</Typography>
    </Box>
  );
};

export default EditorPanel;
