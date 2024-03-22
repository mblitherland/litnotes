import React from 'react';

import { Box } from '@mui/material';
import WorkspaceBar from './workspace-bar.jsx';
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
      <WorkspaceBar
        drawerOpen={drawerOpen}
        onDrawerOpen={handleDrawerOpen} />
      <WorkspaceDrawer
        drawerOpen={drawerOpen}
        onDrawerClose={handleDrawerClose}
        onDrawerOpen={handleDrawerOpen} />
    </Box>
  );
}
