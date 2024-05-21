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
    // Settings could change for a few reasons and resetting the workspace shouldn't always happen.
    if (selectedWorkspaceId !== settings['lastWorkspace']) {
      const workspaceId = getValidWorkspace(settings, settings['lastWorkspace']);
      setSelectedWorkspaceId(workspaceId);
      if (settings['workspaces'][workspaceId] &&
        settings['workspaces'][workspaceId]['tabs'] &&
        settings['workspaces'][workspaceId]['tabs'].length > 0
      ) {
        setTabs(settings['workspaces'][workspaceId]['tabs']);
      } else {
        setTabs(getBlankTab());
      }
    } else if (settings['workspaces'][selectedWorkspaceId] &&
      settings['workspaces'][selectedWorkspaceId]['tabs'] &&
      !(tabs.length === settings['workspaces'][selectedWorkspaceId]['tabs'].length &&
      settings['workspaces'][selectedWorkspaceId]['tabs'].every(
        (value, index) => value['tabSource'] === tabs[index]['tabSource']
    ))) { 
      // That's a bit tricky for boolean logic above. There could be unforseen issues with setting tabs.
      setTabs(settings['workspaces'][selectedWorkspaceId]['tabs']);
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
    const allPaths = tabs.map(n => n.tabSource);
    if (!allPaths.includes(node['path'])) {
      const updatedTabs = tabs.filter((n) => n.tabSource);
      // TODO: Check that it's a .md or .txt?
      updatedTabs.push({
        tabLabel: node['base'],
        tabText: false,
        tabSource: node['path'],
        tabType: node['ext']
      });
      settings['workspaces'][selectedWorkspaceId]['tabs'] = updatedTabs;
      // Set the selected tab to the one just opened
      settings['workspaces'][selectedWorkspaceId]['selectedTab'] = updatedTabs.length - 1;
      updateSettings(settings);
    }
    // TODO: If the file is already open, set that one to the selected tab
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
        fileSelected={handleFileSelected} />
      <WorkspaceMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        selectedWorkspaceId={selectedWorkspaceId}
        tabs={tabs}
        removeTab={handleTabsRemove}
        settings={settings}
        updateSettings={updateSettings} />
    </Box>
  );
}

export default App;
