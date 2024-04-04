import React from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import FolderOpen from '@mui/icons-material/FolderOpen';

import WorkspaceList from './workspace-list.jsx';

const SettingsForm = ({ settings, setSettings }) => {
  const [ directory, setDirectory ] = React.useState('');
  const [ showAlert, setShowAlert ] = React.useState(false);
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);
  const [ workspaceId, setWorkspaceId ] = React.useState('');
  const [ workspaceName, setWorkspaceName ] = React.useState('');
  const [ workspaces, setWorkspaces ] = React.useState(settings['workspaces']);

  const handleAddWorkspace = async() => {
    // TODO: Probably worthwhile to see if the workspace was already added
    
    settings['workspaces'][workspaceId] =  {
      name: workspaceName,
      directory: directory
    };
    setDirectory('');
    setWorkspaceName('');
    setWorkspaces(settings['workspaces']);
    setSettings(settings);
  }

  const handleBrowseWorkspace = async () => {
    const result = await window.electronAPI.browseDirectory();
    if (result['success']) {
      const workspaceId = await window.electronAPI.generateUUID();
      setWorkspaceId(workspaceId);
      setDirectory(result['dir']);
      setWorkspaceName(result['name']);
    } else {
      setDirectory('');
      setShowAlert(true);
    }
  }

  const handleChangeName = (event) => {
    setWorkspaceName(event.target.value);
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  }

  const handleDeleteWorkspace = (id) => {
    delete settings['workspaces'][id];
    setWorkspaces(settings['workspaces']);
    setSettings(settings);
  }

  const handleThemeChange = (event) => {
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
      <Divider textAlign="left" sx={{ mt: 2 }}>Appearance</Divider>
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
          <FormControl flex={1}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="settings-text-name-input"
                label="Name"
                value={workspaceName}
                sx={{ width: "36ch" }}
                onChange={handleChangeName}/>
              <Button
                id="settings-open-workspace"
                component="label"
                color="inherit"
                startIcon={<FolderOpen />}
                disabled={!(directory && workspaceName)}
                onClick={handleAddWorkspace}
              >
                Add Workspace
              </Button>
            </Stack>
            <FormHelperText id="settings-text-name-input">
              Select a name for your workspace.
            </FormHelperText>
          </FormControl>
        </Stack>
      </Paper>
      <Divider textAlign="left">Existing Workspaces</Divider>
      <WorkspaceList workspaces={workspaces} handleDeleteWorkspace={handleDeleteWorkspace}/>
    </>
  );
};

export default SettingsForm;
