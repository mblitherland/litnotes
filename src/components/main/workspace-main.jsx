import React from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import DrawerHeader from '../drawer/drawer-header.jsx';

const StyledMain = styled('div', { shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'drawerWidth' })(
  ({ theme, drawerOpen, drawerWidth }) => ({
    flexGrow: 1,
    width: '100%',
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

const WorkspaceMain =  ({ drawerOpen, drawerWidth, selectedWorkspaceId, tabs, removeTab }) => {

  React.useEffect(() => {
    console.log("Selected workspace updated in WorkspaceMain");
  }, [ selectedWorkspaceId ] );

  const tabClosed = () => {
    // Remove tab, save list of tabs to the settings
    // call removeTab
  };

  const tabSelected = (index) => {
    // Set the selected index to the provided index
    // Save selected tabl to the settings
  };

  return (
    <>
      <StyledMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      >
        <DrawerHeader />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs>
              { tabs[0]['tab'] }
              { 
                /* tabs.forEach((pair) => { 
                  console.log('p', pair['tab']);
                  return ( pair['tab'] );
                }) */
              }
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          { tabs[0]['panel'] }
        </Box>
        <Typography sx={{ margin: '1em' }} fontSize={32}>
          Workspace: {JSON.stringify(selectedWorkspaceId)}
        </Typography>
      </StyledMain>
    </>
  );
}

export default WorkspaceMain;
