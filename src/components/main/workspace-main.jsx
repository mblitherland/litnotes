import React from 'react';

import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar';
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

const WorkspaceMain =  ({
  drawerOpen,
  drawerWidth,
  selectedWorkspaceId,
  tabs,
  removeTab,
  settings,
  updateSettings
}) => {

  const [ alerts, setAlerts ] = React.useState([]);
  const [ selectedTab, setSelectedTab ] = React.useState(0);
  const [ showAlert, setShowAlert ] = React.useState(false);

  React.useEffect(() => {
    console.log("Selected workspace updated in WorkspaceMain");
    if (!settings['workspaces'][selectedWorkspaceId]) {
      setSelectedTab(0);
    } else if (selectedTab !== settings['workspaces'][selectedWorkspaceId]['selectedTab']) {
      setSelectedTab(settings['workspaces'][selectedWorkspaceId]['selectedTab'] || 0);
    }
  }, [ selectedWorkspaceId, settings ]);

  const addAlert = (alert) => {
    setAlerts([...alerts, alert]);
    setShowAlert(true);
  }

  const handleCloseAlert = () => {
    setAlerts([]);
    setShowAlert(false);
  }

  const tabSelected = (_event, newValue) => {
    // Set the selected index to the provided index
    setSelectedTab(parseInt(newValue));
    settings['workspaces'][selectedWorkspaceId]['selectedTab'] = parseInt(newValue);
    updateSettings(settings);
  };

  return (
    <>
      <StyledMain
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      >
        <DrawerHeader />
        <Snackbar
          open={showAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            varient="filled"
            sx={{ width: '100%' }}
          >
            <List>
              {
                Object.entries(alerts).map(([id, alert]) => (
                  <ListItem key={id}>
                    <ListItemText
                      primary={alert}
                      sx={{ flex: 1 }} />
                  </ListItem>
                ))
              }
            </List>
          </Alert>
        </Snackbar>
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
                visible={selectedTab}
                addAlert={addAlert}
                removeTab={removeTab} />
            ))
          }
        </Box>
      </StyledMain>
    </>
  );
}

export default WorkspaceMain;
