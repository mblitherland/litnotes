import React from 'react';

import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FolderOpen from '@mui/icons-material/FolderOpen';

const SettingsForm = ({ settings, setSettings }) => {
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);

  const handleBrowseForWorkSpace = async () => {
    const result = await window.electronAPI.browseDirectory();
    const dir = result['filePaths'][0];
    console.log("got directory: "+dir);
  }

  const handleThemeChange = (event) => {
    settings['themeName'] = event.target.value;
    setThemeName(event.target.value);
    setSettings(settings);
  }

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
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
          Choose a theme for Litnotes. This change requires a restart.
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <Button
          id="settings-open-workspace"
          component="label"
          color="inherit"
          startIcon={<FolderOpen />}
          onClick={handleBrowseForWorkSpace}
        >
          Select workspace directory
        </Button>
        <FormHelperText id="settings-open-workspace-helper-text">
          Add a workspace.
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default SettingsForm;
