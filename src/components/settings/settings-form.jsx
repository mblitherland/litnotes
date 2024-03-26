import React from 'react';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const SettingsForm = ({ settings, setSettings }) => {
  const [ themeName, setThemeName ] = React.useState(settings['themeName']);

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
          This change requires a restart.
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default SettingsForm;
