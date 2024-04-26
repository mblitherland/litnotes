import React from 'react';

import Box from '@mui/material/Box';

import WorkspaceBar from './workspace-bar.jsx';
import WorkspaceDrawer from './drawer/workspace-drawer.jsx';
import WorkspaceMain from './main/workspace-main.jsx';

const drawerWidth = 320;

const getValidWorkspace = (settings, id) => {
  if (id && id !== 'none' && (id in settings['workspaces'])) {
    return id;
  }
  return 'none';
}

const App = ({ settings, updateSettings }) => {

  const initialWorkspaceId = getValidWorkspace(settings, settings['lastWorkspace']);

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = React.useState(initialWorkspaceId);

  React.useEffect(() => {
    setSelectedWorkspaceId(getValidWorkspace(settings, settings['lastWorkspace']));
  }, [ settings ]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleSelectedWorkspaceId = (id) => {
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
        selectedWorkspaceId={selectedWorkspaceId} />
      <WorkspaceMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        selectedWorkspaceId={selectedWorkspaceId} />
    </Box>
  );
}

export default App;
