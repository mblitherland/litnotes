import React from 'react';

import { Button, Divider, FormControl, FormHelperText, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField } from '@mui/material';
import { FolderOpen, LibraryBooks } from '@mui/icons-material';

const SettingsForm = ({ settings, setSettings }) => {
  const [ directory, setDirectory ] = React.useState('');
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);
  const [ workSpaceName, setWorkSpaceName ] = React.useState('');
  const [ workSpaces, setWorkSpaces ] = React.useState(settings['workSpaces']);

  // React.useEffect(() => {
  //   console.log("Got workspaces: " + JSON.stringify(workSpaces));
  // }, [workSpaces]); 

  const handleAddWorkSpace = async () => {
    const result = await window.electronAPI.browseDirectory();
    // TODO: Probably worthwhile to see if the workspace was already added
    const workSpaceId = await window.electronAPI.generateUUID();
    settings['workSpaces'][workSpaceId] =  {
      name: result['name'],
      directory: result['dir']
    };
    setWorkSpaces(settings['workSpaces']);
    setSettings(settings);
  }

  const handleThemeChange = (event) => {
    // TODO: This might be unnecessarily convoluted
    settings['themeName'] = event.target.value;
    setThemeName(event.target.value);
    setSettings(settings);
  }

  return (
    <>
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
        <FormControl flex={1}>
          <TextField
            id="settings-text-directory-input"
            label="Directory"
            disabled={true}
            value={directory} />
          <FormHelperText id="settings-text-directory-input">
            Select a directory to add a workspaces.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            id="settings-open-workspace"
            component="label"
            color="inherit"
            startIcon={<FolderOpen />}
            onClick={handleAddWorkSpace}
          >
            Select directory
          </Button>
        </FormControl>
        <FormControl>
          <TextField
            id="settings-text-name-input"
            label="Name"
            value={workSpaceName} />
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
      </Paper>
      <Divider textAlign="left">Existing Workspaces</Divider>
      <Paper sx={{ m: 2, p: 2 }}>
        <List>
          {
            Object.entries(workSpaces).map(([id, workSpace]) => (
              <ListItem key={id}>
                <LibraryBooks sx={{ mr: 2 }} />
                <ListItemText
                  primary={workSpace.name}
                  secondary={workSpace.directory}/>
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </>
  );
};

export default SettingsForm;
