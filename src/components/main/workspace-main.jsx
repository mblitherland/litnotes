import React from 'react';

import { styled } from '@mui/material';
import { Typography } from '@mui/material';
import DrawerHeader from '../drawer/drawer-header.jsx';

const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'drawerWidth' })(
  ({ theme, drawerOpen, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(drawerOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const WorkspaceMain =  ({ drawerOpen, drawerWidth, selectedWorkspaceId }) => {

  React.useEffect(() => {
    console.log("Selected workspace updated in WorkspaceMain");
  }, [ selectedWorkspaceId ] );

  return (
    <>
      <StyledMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      >
        <DrawerHeader />
        <Typography fontSize={32}>
          Workspace: {JSON.stringify(selectedWorkspaceId)}
        </Typography>
        <Typography paragraph>
          This is just a plain old paragraph.
        </Typography>
        <Typography fontSize={64} color="grey">
          This is a fancy paragraph.
        </Typography>
      </StyledMain>
    </>
  );
}

export default WorkspaceMain;