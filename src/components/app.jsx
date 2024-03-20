import React from 'react';

import { Box } from '@mui/material';
import WorkspaceBar from './workspace-bar.jsx';
import WorkspaceDrawer from './drawer.jsx';
import WorkspaceMain from './workspace-main.jsx';

const drawerWidth = 240;

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
        onDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth} />
      <WorkspaceDrawer
        drawerOpen={drawerOpen}
        onDrawerClose={handleDrawerClose}
        onDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth} />
      <WorkspaceMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth} />
    </Box>
  );
}
