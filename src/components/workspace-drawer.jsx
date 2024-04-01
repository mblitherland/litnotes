import React from 'react';

import { useTheme } from '@mui/material';
import { Box, Button, Card, Dialog, Divider, Drawer, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Settings } from '@mui/icons-material';
import DrawerHeader from './drawer-header.jsx';

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
        open={settingsOpen}
        onClose={handleSettingsClose}
      >
        <Typography paragraph>
          This is a modal.
        </Typography>
        <Button variant="outlined" onClick={handleSettingsClose}>
          Close modal.
        </Button>
      </Dialog>
    </>
  );
}

export default WorkspaceDrawer;
