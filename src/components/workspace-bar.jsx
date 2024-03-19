import React from 'react';

import { styled } from '@mui/material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

const StyledWorkspaceBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'drawerWidth',
})(({ theme, drawerOpen, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const WorkspaceBar = ({ drawerOpen, onDrawerOpen }) => {

  return (
    <>
      <StyledWorkspaceBar
        drawerWidth={240}
        drawerOpen={drawerOpen}
        position="fixed">
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
      </StyledWorkspaceBar>
    </>
  );
}

export default WorkspaceBar;
