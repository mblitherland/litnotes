import React from 'react';

import { Box } from '@mui/material';
import WorkspaceDrawer from './drawer.jsx';

export default function App() {
  return (
    <Box
      sx={{ display: 'flex' }}
    >
      <WorkspaceDrawer />
    </Box>
  );
}
