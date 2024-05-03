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
    setSelectedWorkspaceId(getValidWorkspace(settings, settings['lastWorkspace']));
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
    const allPaths = tabs.map(e => e.tabSource);
    if (!allPaths.includes(node['path'])) {
      // TODO: Check that it's a .md or .txt?
      // Strip out just the base and ext, but they'll have to be added to the node by getdir
      tabs.push({
        tabLabel: node['base'],
        tabText: false,
        tabSource: node['path']
      });
      setTabs(tabs);

      // TODO: working above
    }
    console.log("All paths:", allPaths);
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
