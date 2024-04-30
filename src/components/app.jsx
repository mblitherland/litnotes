import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import TabPanel from './main/TabPanel.jsx';
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

const getBlankTab = () => {
  return [
    {
      tab: <Tab label="Select a file from your workspace" id="main-tabs--1" />,
      panel: <TabPanel />
    }
  ]
}

const App = ({ settings, updateSettings }) => {

  const initialWorkspaceId = getValidWorkspace(settings, settings['lastWorkspace']);

  const [ drawerOpen, setDrawerOpen ] = React.useState(true);
  const [ selectedWorkspaceId, setSelectedWorkspaceId ] = React.useState(initialWorkspaceId);
  const [ tabs, setTabs ] = React.useState(getBlankTab());

  React.useEffect(() => {
    setSelectedWorkspaceId(getValidWorkspace(settings, settings['lastWorkspace']));
  }, [ settings ]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleTabsAdd = () => {

  };

  const handleTabsRemove = (index) => {

  };

  return (
    <Box
      sx={{ display: 'flex', width: '100%' }}
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
        selectedWorkspaceId={selectedWorkspaceId}
        tabs={tabs}
        addTab={handleTabsAdd} />
      <WorkspaceMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        selectedWorkspaceId={selectedWorkspaceId}
        tabs={tabs}
        removeTab={handleTabsRemove} />
    </Box>
  );
}

export default App;
