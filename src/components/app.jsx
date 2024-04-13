import React from 'react';

import Box from '@mui/material/Box';

import WorkspaceBar from './workspace-bar.jsx';
import WorkspaceDrawer from './workspace-drawer.jsx';
import WorkspaceMain from './workspace-main.jsx';

const drawerWidth = 320;

const getValidWorkspace = (settings, id) => {
  if (id && id !== "none" && (id in settings['workspaces'])) {
    return settings['workspaces'][id];
  }
  return {};
}

const App = ({ settings, updateSettings }) => {

  const initialWorkspace = getValidWorkspace(settings, settings['lastWorkspace']);

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(initialWorkspace);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleSelectedWorkspace = (id) => {
    setSelectedWorkspace(getValidWorkspace(settings, id));
  }

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
        drawerWidth={drawerWidth}
        settings={settings}
        updateSettings={updateSettings}
        selectedWorkspace={selectedWorkspace}
        setSelectedWorkspace={handleSelectedWorkspace} />
      <WorkspaceMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        selectedWorkspace={selectedWorkspace} />
    </Box>
  );
}

export default App;
