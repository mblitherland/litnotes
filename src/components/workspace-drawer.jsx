import React from 'react';

import { useTheme } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Settings from '@mui/icons-material/Settings.js';

import DrawerHeader from './drawer-header.jsx';
import SettingsModal from './settings/settings-modal.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const themeName = await window.electronAPI.getSetting('themeName');
const workspaces = await window.electronAPI.getSetting('workspaces');
const settings = { themeName, workspaces };

const WorkspaceDrawer = ({ drawerOpen, onDrawerClose, onDrawerOpen, drawerWidth, ...props }) => {
  const theme = useTheme();

  const [ settingsOpen, setSettingsOpen ] = React.useState(false);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  }

  const saveSettings = async () => {
    await window.electronAPI.setSetting('themeName', settings['themeName']);
    await window.electronAPI.setSetting('workspaces', settings['workspaces']);
  };

  const setSettings = (newSettings) => {
    settings['themeName'] = newSettings['themeName'];
    settings['workspaces'] = newSettings['workspaces'];
  };

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
          <Typography variant="big" noWrap component="div">
            No Workspace Selected
          </Typography>
          <Card
            sx={{
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
          setSettings={setSettings}
          saveSettings={saveSettings}
          handleSettingsClose={handleSettingsClose} />
      </Dialog>
    </>
  );
}

export default WorkspaceDrawer;
