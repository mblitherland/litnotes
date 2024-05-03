import React from 'react';

import { useTheme } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slide from '@mui/material/Slide';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Replay from '@mui/icons-material/Replay';
import Settings from '@mui/icons-material/Settings.js';

import DrawerHeader from './drawer-header.jsx';
import SettingsModal from '../settings/settings-modal.jsx';
import WorkspaceTree from './workspace-tree.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkspaceDrawer = ({
  drawerOpen,
  onDrawerClose,
  onDrawerOpen,
  drawerWidth,
  settings,
  updateSettings,
  selectedWorkspaceId,
  tabs,
  fileSelected,
  ...props
}) => {
  const theme = useTheme();

  const [ settingsOpen, setSettingsOpen ] = React.useState(false);
  const [ workspaceTree, setWorkspaceTree ] = React.useState({});

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  }

  React.useEffect(() => {
    // TODO: See if there's a better way to do this.
    if (!('type' in workspaceTree) && !(selectedWorkspaceId === 'none')) {
      // This performs the initial load of the selected workspace
      handleLoadWorkspace(selectedWorkspaceId);
    }
  });

  React.useEffect(() => {
    console.log("Workspace tree updated in WorkspaceDrawer");
  }, [ workspaceTree] );

  const handleWorkspaceChange = async (event) => {
    const workspaceId = event.target.value;
    settings['lastWorkspace'] = workspaceId;
    updateSettings(settings);
    await handleLoadWorkspace(workspaceId);
  }

  const handleLoadWorkspace = async (workspaceId) => {
    const dir = settings['workspaces'][workspaceId]['directory'];
    const workspaceDirectory = await window.electronAPI.getDirectory(dir);
    setWorkspaceTree(workspaceDirectory);
  }

  const ShowNoWorkspaceSelected = () => {
    if (selectedWorkspaceId === 'none')
    return
      <>
        <Card
          sx={{
            marginTop: '10px',
            padding: '10px'
          }}
        >
          Please select a workspace. If you haven't configured
          any workspaces, you may do so using the settings button
          above.
        </Card>
      </>;
  }

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        { ...props }
        anchor="left"
        open={drawerOpen}
        onClose={onDrawerClose}
      >
        <DrawerHeader>
          <Box>
            <IconButton onClick={handleSettingsOpen}>
              <Settings />
            </IconButton>
            <IconButton onClick={() => handleLoadWorkspace(selectedWorkspaceId)}>
              <Replay />
            </IconButton>
          </Box>
          <IconButton onClick={onDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            padding: 1,
          }}
        >
          <FormControl fullWidth={true}>
            <Select
              id="drawer-select-workspace"
              value={selectedWorkspaceId}
              onChange={handleWorkspaceChange}
            >
              {
                (selectedWorkspaceId === 'none' || !(selectedWorkspaceId in settings['workspaces'])) &&
                <MenuItem key={'none'} value="none">No Workspace Selected</MenuItem>
              }
              {
                Object.entries(settings['workspaces']).map(([id, workspace]) => (
                  <MenuItem key={id} value={id}>{workspace['name']}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <ShowNoWorkspaceSelected />
          <WorkspaceTree workspaceTree={workspaceTree} fileSelected={fileSelected} />
        </Box>
      </Drawer>
      <Dialog
        fullScreen
        open={settingsOpen}
        onClose={handleSettingsClose}
        TransitionComponent={Transition}
      >
        <SettingsModal
          settings={settings}
          updateSettings={updateSettings}
          handleSettingsClose={handleSettingsClose} />
      </Dialog>
    </>
  );
}

export default WorkspaceDrawer;
