import React from 'react';

import { useTheme } from '@mui/material';
import { Box, Button, Card, Dialog, Divider, Drawer, IconButton, Slide, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Settings } from '@mui/icons-material';
import DrawerHeader from './drawer-header.jsx';
import SettingsForm from './settings/settings-form.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkspaceDrawer = ({ drawerOpen, onDrawerClose, onDrawerOpen, drawerWidth, ...props }) => {
  const theme = useTheme();

  const [ settingsOpen, setSettingsOpen ] = React.useState(false);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false);
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
        <SettingsForm 
          handleSettingsClose={handleSettingsClose} />
      </Dialog>
    </>
  );
}

export default WorkspaceDrawer;
