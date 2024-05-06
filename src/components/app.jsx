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

const getBlankTab = () => {
  return [
    {
      tabLabel: "No files open",
      tabText: "Please select a file from your workspace.",
      tabType: null,
      tabSource: false // This would be the file path
    }
  ]
}

const App = ({ settings, updateSettings }) => {

  const initialWorkspaceId = getValidWorkspace(settings, settings['lastWorkspace']);

  const [ drawerOpen, setDrawerOpen ] = React.useState(true);
  const [ selectedWorkspaceId, setSelectedWorkspaceId ] = React.useState(initialWorkspaceId);
  const [ tabs, setTabs ] = React.useState(getBlankTab());

  React.useEffect(() => {
    // Settings could change for a few reasons and resetting the workspace shouldn't always happen
    if (selectedWorkspaceId !== settings['lastWorkspace']) {
      setSelectedWorkspaceId(getValidWorkspace(settings, settings['lastWorkspace']));
      // TODO: Restore previously opened tabs for workspace
      setTabs(getBlankTab());
    }
  }, [ settings ]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleTabsRemove = (index) => {
    console.log("In handleTabsRemove", index);
    // TODO: If we've removed the last tab
    // setTabs(getBlankTab());
  };

  const handleFileSelected = (node) => {
    console.log("Im handleFileSelected", node);
    const allPaths = tabs.map(n => n.tabSource);
    if (!allPaths.includes(node['path'])) {
      // TODO: Check that it's a .md or .txt?
      tabs.push({
        tabLabel: node['base'],
        tabText: false,
        tabSource: node['path'],
        tabType: node['ext']
      });
      setTabs(tabs.filter((n) => n.tabSource !== false));
    }
    console.log("All paths:", tabs);
  }

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
        fileSelected={handleFileSelected} />
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
