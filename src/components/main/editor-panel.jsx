import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditorPanel = ({ index, tabText, tabSource, tabType, visible }) => {

  return (
    <div
      hidden={index !== visible}
    >
      { index === visible && tabType === ".md" && (
        <Box sx={{ padding: 2 }}>
          { 
            tabSource && <Typography>This will be an MDX panel containing {tabSource}</Typography>
          }
          {
            tabText && <Typography>{tabText}</Typography>
          }
          {/* TODO: this is just while we're developing the tabs */}
        </Box>
      )}
      { index === visible && tabType !== ".md" && (
        <Box sx={{ padding: 2 }}>
          { tabType === null && (
            <Typography>{tabText}</Typography>
          )}
          { tabType !== null && (
            <Typography>Cowardly refusing to handle a file that's not apparently Markdown.</Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default EditorPanel;
