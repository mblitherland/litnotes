import React from 'react';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import DrawerHeader from '../drawer/drawer-header.jsx';
import EditorPanel from './editor-panel.jsx';

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
    // TODO: pick the selected tab from the settings, for now set to 0
    setSelectedTab(0);
  }, [ selectedWorkspaceId ] );

  const [ selectedTab, setSelectedTab ] = React.useState(0);

  const tabClosed = (index) => {
    // Remove tab, save list of tabs to the settings
    // call removeTab
  };

  const tabSelected = (_event, newValue) => {
    console.log("In tab selected", newValue);
    // Set the selected index to the provided index
    setSelectedTab(parseInt(newValue));
    // TODO: Save selected tab to the settings
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
            <Tabs
              value={selectedTab} 
              onChange={tabSelected}
              variant="scrollable"
              scrollButtons="auto"
            >
              { 
                Object.entries(tabs).map(([index, value]) => (
                  <Tab label={value['tabLabel']} key={index} id={"editor-tab-"+index} />
                ))
              }
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          {
            Object.entries(tabs).map(([index, value]) => (
              <EditorPanel
                key={"panel-"+index}
                index={parseInt(index)}
                tabText={value['tabText']}
                tabSource={value['tabSource']}
                tabType={value['tabType']}
                visible={selectedTab} />
            ))
          }
        </Box>
      </StyledMain>
    </>
  );
}

export default WorkspaceMain;
