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
import Settings from '@mui/icons-material/Settings.js';

import DrawerHeader from './drawer-header.jsx';
import SettingsModal from './settings/settings-modal.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkspaceDrawer = ({ drawerOpen, onDrawerClose, onDrawerOpen, drawerWidth, settings, updateSettings, ...props }) => {
  const theme = useTheme();

  const [ settingsOpen, setSettingsOpen ] = React.useState(false);
  const [ workspace, setWorkspace ] = React.useState(settings['lastWorkspace']);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  }

  React.useEffect(() => {
    var selectedWorkspace = settings['lastWorkspace'];
    if (!(selectedWorkspace in settings['workspaces'])) {
      selectedWorkspace = 'none';
    }
    setWorkspace(selectedWorkspace);
  }, [ settings ]);

  const handleWorkspaceChange = (event) => {
    settings['lastWorkspace'] = event.target.value;
    updateSettings(settings);
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
          <IconButton onClick={handleSettingsOpen}>
            <Settings />
          </IconButton>
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
              value={workspace}
              onChange={handleWorkspaceChange}
            >
              <MenuItem value="none">No Workspace Selected</MenuItem>
            </Select>
          </FormControl>
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
