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

const SettingsForm = ({ settings, updateSettings }) => {
  const [ directory, setDirectory ] = React.useState('');
  const [ showAlert, setShowAlert ] = React.useState(false);
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);
  const [ workspaceId, setWorkspaceId ] = React.useState('');
  const [ workspaceName, setWorkspaceName ] = React.useState('');
  const [ workspaces, setWorkspaces ] = React.useState(settings['workspaces']);

  const handleAddWorkspace = async () => {
    // TODO: Probably worthwhile to see if the workspace was already added
    
    settings['workspaces'][workspaceId] =  {
      name: workspaceName,
      directory: directory
    };
    setDirectory('');
    setWorkspaceName('');
    setWorkspaces(settings['workspaces']);
    updateSettings(settings);
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
    updateSettings(settings);
  }

  const handleThemeChange = (event) => {
    settings['themeName'] = event.target.value;
    setThemeName(event.target.value);
    updateSettings(settings);
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
      <Divider textAlign="left" sx={{ mt: 2 }}>Appearance</Divider>
      <Paper sx={{ m: 2, p: 2 }}>
        <FormControl sx={{ p: 1 }}>
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
          <FormHelperText>Dark mode currently broken</FormHelperText>
        </FormControl>
        <FormControl sx={{ p: 1, minWidth: "120px" }}>
          <InputLabel id="settings-select-drawer-side-label">Drawer side</InputLabel>
          <Select
            labelId="settings-select-drawer-side-label"
            id="settings-select-drawer-side"
            value="left"
            label="Show Dev Tools"
            onChange={() => {}}
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ p: 1, minWidth: "120px" }}>
          <InputLabel id="settings-select-drawer-width-label">Drawer width</InputLabel>
        </FormControl>
        <FormControl sx={{ p: 1, minWidth: "120px" }}>
          <InputLabel id="settings-select-dev-tools-label">Show dev tools</InputLabel>
          <Select
            labelId="settings-select-dev-tools-label"
            id="settings-select-dev-tools"
            value="false"
            label="Show Dev Tools"
            onChange={() => {}}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
          <FormHelperText>Requires a restart</FormHelperText>
        </FormControl>
      </Paper>
    </>
  );
};

export default SettingsForm;
