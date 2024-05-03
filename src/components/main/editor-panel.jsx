import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditorPanel = ({ index, tabText, tabSource }) => {

  return (
    <Box sx={{ padding : 2 }}>
      { 
        tabSource && <Typography>This will be an MDX panel containing {tabSource}</Typography>
      }
      {
        tabText && <Typography>{tabText}</Typography>
      }
      {/* TODO: this is just while we're developing the tabs */}
      <Typography variant="caption" sx={{ opacity: '50%' }}>My index is {index}</Typography>
    </Box>
  );
};

export default EditorPanel;
