import React from 'react';

import { Box } from '@mui/material';
import WorkspaceDrawer from './drawer.jsx';

export default function App() {

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  
  return (
    <Box
      sx={{ display: 'flex' }}
    >
      <WorkspaceDrawer
        drawerOpen={drawerOpen}
        onDrawerClose={handleDrawerClose}
        onDrawerOpen={handleDrawerOpen} />
    </Box>
  );
}
