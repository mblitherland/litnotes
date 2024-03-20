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

const WorkspaceDrawer = ({ ...props }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleCloseDrawer = () => {
    setOpen(false);
  }
  const handleOpenDrawer = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <LitAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
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
        open={open}
        onClose={handleCloseDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleCloseDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>

        <Typography variant="h6" noWrap component="div">
          Drawer!
        </Typography>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          This is just a plain old paragraph.
        </Typography>
      </Main>
    </React.Fragment>
  );
}

export default WorkspaceDrawer;
