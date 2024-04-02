import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Delete from '@mui/icons-material/Delete';
import FolderOpen from '@mui/icons-material/FolderOpen';
import LibraryBooks from '@mui/icons-material/LibraryBooks';

const SettingsForm = ({ settings, setSettings }) => {
  const [ addWorkspace, setAddWorkspace ] = React.useState({});
  const [ directory, setDirectory ] = React.useState('');
  const [ showAlert, setShowAlert ] = React.useState(false);
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);
  const [ workspaceId, setWorkspaceId ] = React.useState('');
  const [ workspaceName, setWorkspaceName ] = React.useState('');
  const [ workspaces, setWorkspaces ] = React.useState(settings['workspaces']);

  // React.useEffect(() => {
  //   console.log("Got workspaces: " + JSON.stringify(workspaces));
  // }, [workspaces]); 

  const handleAddWorkspace = async() => {
    
    // settings['workspaces'][workspaceId] =  {
    //   name: result['name'],
    //   directory: result['dir']
    // };
  }

  const handleBrowseWorkspace = async () => {
    const result = await window.electronAPI.browseDirectory();
    if (result['success']) {
      // TODO: Probably worthwhile to see if the workspace was already added
      const workspaceId = await window.electronAPI.generateUUID();
      setWorkspaceId(workspaceId);
      setDirectory(result['dir']);
      setWorkspaceName(result['name']);
    } else {
      setDirectory('');
      setShowAlert(true);
    }

  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  }

  const handleThemeChange = (event) => {
    // TODO: This might be unnecessarily convoluted
    settings['themeName'] = event.target.value;
    setThemeName(event.target.value);
    setSettings(settings);
  }

  return (
    <>
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
          Unable to select a directory.
        </Alert>
      </Snackbar>
      <Divider textAlign="left">Appearance</Divider>
      <Paper sx={{ m: 2, p: 2 }}>
        <FormControl>
          <InputLabel id="settings-select-theme-label">Theme</InputLabel>
          <Select
            labelId="settings-select-theme-label"
            id="settings-select-theme"
            value={themeName}
            label="Theme"
            onChange={handleThemeChange}
          >
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="light">Light</MenuItem>
          </Select>
          <FormHelperText id="settings-select-theme-helper-text">
            This change requires a restart.
          </FormHelperText>
        </FormControl>
      </Paper>
      <Divider textAlign="left">Add Workspace</Divider>
      <Paper sx={{ m: 2, p: 2 }}>
        <Stack spacing={2}>
          <FormControl flex={1}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="settings-text-directory-input"
                label="Directory"
                disabled={true}
                value={directory}
                sx={{ flex: 1 }} />
              <Button
                id="settings-open-workspace"
                component="label"
                color="inherit"
                startIcon={<FolderOpen />}
                onClick={handleBrowseWorkspace}
              >
                Browse
              </Button>
            </Stack>
            <FormHelperText id="settings-text-directory-input">
              Select a directory to add a workspaces.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              id="settings-text-name-input"
              label="Name"
              value={workspaceName}
              sx={{ width: "36ch" }} />
            <FormHelperText id="settings-text-name-input">
              Select a name for your workspace.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Button
              id="settings-open-workspace"
              component="label"
              color="inherit"
              startIcon={<FolderOpen />}
            >
              Add Workspace
            </Button>
          </FormControl>
        </Stack>
      </Paper>
      <Divider textAlign="left">Existing Workspaces</Divider>
      <Paper sx={{ m: 2, p: 2 }}>
        <List>
          {
            Object.entries(workspaces).map(([id, workspace]) => (
              <ListItem key={id}>
                <LibraryBooks sx={{ mr: 2 }} />
                <ListItemText
                  primary={workspace.name}
                  secondary={workspace.directory}
                  sx={{ flex: 1 }}/>
                <Delete />
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </>
  );
};

export default SettingsForm;
