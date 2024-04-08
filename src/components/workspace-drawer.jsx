import React from 'react';

import { useTheme } from '@mui/material';
import { Box, Card, Dialog, Divider, Drawer, IconButton, Slide, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Settings } from '@mui/icons-material';
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
            Please configure a workspace using the settings button above.
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
