import React, { useState } from 'react';

import { styled, useTheme } from '@mui/material';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const LitAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const WorkspaceDrawer = ({ drawerOpen, onDrawerClose, onDrawerOpen, ...props }) => {
  const theme = useTheme();

  return (
    <>
      <LitAppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Litnotes
          </Typography>
        </Toolbar>
      </LitAppBar>
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
          <IconButton onClick={onDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>

        <Typography variant="h6" noWrap component="div">
          Drawer!
        </Typography>
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Typography paragraph>
          This is just a plain old paragraph.
        </Typography>
      </Main>
    </>
  );
}

export default WorkspaceDrawer;
